from flask import Blueprint, request, redirect
from ..models import db
from ..models.product import Product
from ..models.shopping_cart import ShoppingCart
from ..models.shopping_cart_item import ShoppingCartItems
from ..forms.product_form import ProductForm
from ..forms.cart_item_form import CartItemForm
from datetime import datetime
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user # current_user.id
from .aws_helper import upload_file_to_s3, get_unique_filename, remove_file_from_s3

products = Blueprint("products", __name__)
#get all prods
@products.route("/")
def get_products():
    """
    [
  {
    "category": "Electronics",
    "created_at": "Thu, 07 Sep 2023 16:58:51 GMT",
    "description": "Apple 2023 MacBook Pro Laptop M2 Pro chip with 10\u2011core CPU and 16\u2011core GPU: 14.2-inch Liquid Retina XDR Display, 16GB Unified Memory, 512GB SSD Storage",
    "id": 1,
    "image": "https://m.media-amazon.com/images/I/61lYIKPieDL._AC_SL1500_.jpg",
    "name": "2023 MacBook Pro",
    "price": "1999.95",
    "quantity": 10,
    "user_id": 1
  },
  ]
    """
    all_products = Product.query.all()

    response = [prod.to_dict() for prod in all_products]

    print(response)
    return response


#get prod by id
@products.route("/<int:id>")
def get_single_product(id):
    """
    {
    "category": "Electronics",
    "created_at": "Thu, 07 Sep 2023 16:58:51 GMT",
    "description": "Apple 2023 MacBook Pro Laptop M2 Pro chip with 10\u2011core CPU and 16\u2011core GPU: 14.2-inch Liquid Retina XDR Display, 16GB Unified Memory, 512GB SSD Storage",
    "id": 1,
    "image": "https://m.media-amazon.com/images/I/61lYIKPieDL._AC_SL1500_.jpg",
    "name": "2023 MacBook Pro",
    "price": "1999.95",
    "quantity": 10,
    "user_id": 1
    }
    """
    response = Product.query.get(id)
    print(response.to_dict())
    return response.to_dict()


#post new product
@products.route("/new", methods=["POST"])
def create_product():
      """

      """
      form = ProductForm()

      form["csrf_token"].data = request.cookies["csrf_token"]
      if form.validate_on_submit():
            # image = form.data['image'] #image coming back as none
            image = request.files['image']
            print("image in product create", image)
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            print(upload)
            print("in product route *************")

            if "url" not in upload:
                return {"errors": "URL not in upload"}

            url = upload["url"]

            new_product = Product(
                  name = form.data["name"],
                  price = form.data["price"],
                  description = form.data["description"],
                  quantity = form.data["quantity"],
                  category = form.data["category"],
                  user_id = current_user.id,
                  image = url,
            )

            print(new_product)
            db.session.add(new_product)
            db.session.commit()
            return {"product": new_product.to_dict()}, 201
      return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#update product
@products.route('/<int:id>', methods=['PUT'])
@login_required
def update_product(id):
    product = Product.query.get(id)
    if not product:
        return {"errors": "Product not found"}, 404
    if product.user_id != current_user.id:
        return {"errors": "Unauthorized"}, 403

    form = ProductForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        if 'image' in request.files:
            image = request.files['image']
            image.filename = get_unique_filename(image.filename)
            upload = upload_file_to_s3(image)
            if "url" not in upload:
                return {"errors": "URL not in upload"}
            remove_file_from_s3(product.image)
            product.image = upload["url"]

        product.name = form.data["name"]
        product.price = form.data["price"]
        product.description = form.data["description"]
        product.quantity = form.data["quantity"]
        product.category = form.data["category"]

        db.session.commit()
        return {"product": product.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


#delete product
@products.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    print("DELETE route accessed for product:", id)
    product = Product.query.get(id)
    if not product:
        return {"errors": "Product not found"}, 404
    if product.user_id != current_user.id:
        return {"errors": "Unauthorized"}, 403

    remove_file_from_s3(product.image)
    db.session.delete(product)
    db.session.commit()

    return {"message": "Product deleted successfully"}


NotFoundError = {"error": "Not Found"}, 404
ForbiddenError = {"error": "Forbidden"}, 403

# ADD product to cart
@products.route("/<int:id>/add", methods=["POST"])
@login_required
def add_product_to_cart(id):
    try:
        product = Product.query.get(id)

        if not product:
            error = NotFoundError('Product Not Found')
            return error.error_json()

        # check if product is in stock
        if product.quantity <= 0:
            error = ForbiddenError('Out of stock!')
            return error.error_json()

        # if user has no cart, create one
        if not current_user.shopping_carts:
            new_cart = ShoppingCart(user_id=current_user.id)
            db.session.add(new_cart)
            db.session.commit()

        # add cart item to cart
        form = CartItemForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            cart_item = ShoppingCartItems(
                shoppingCartId=current_user.shopping_carts[0].id,
                productId=product.id,
                quantity=form.data["quantity"]
            )

            # Deduct the product quantity
            product.quantity -= form.data["quantity"]

            # if item already in cart, add quantity
            for item in current_user.shopping_carts[0].shopping_cart_items:
                if item.productId == product.id:
                    item.quantity += form.data["quantity"]
                    db.session.commit()
                    return {"cart_item": item.to_dict()}

            db.session.add(cart_item)
            db.session.commit()

            return {"cart_item": cart_item.to_dict()}
        else:
            return {"errors": form.errors}, 400

    except Exception as e:  # General exception to catch all errors
        print("Error:", str(e))
        return {"error": "Internal server error"}, 500

