from flask import Blueprint, request, redirect
from ..models import db
from ..models.product import Product
from ..models.shopping_cart import ShoppingCart
from ..models.shopping_cart_item import ShoppingCartItems
from ..forms.product_form import ProductForm
from datetime import datetime
from .auth_routes import validation_errors_to_error_messages
from flask_login import login_required, current_user # current_user.id
from .aws_helper import upload_file_to_s3, get_unique_filename, remove_file_from_s3

products = Blueprint("products", __name__)

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



@products.route("/new", methods=["POST"])
def create_product():
      """

      """
      form = ProductForm()

      form["csrf_token"].data = request.cookies["csrf_token"]
      if form.validate_on_submit():
            image = form.data['image'] #image coming back as none
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
            return {"product": Product.to_dict()}, 201
      return {'errors': validation_errors_to_error_messages(form.errors)}, 400
