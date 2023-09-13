from flask import Blueprint, request
from flask_login import login_required, current_user
from ..models import db, ShoppingCart, ShoppingCartItems, Product
from ..forms import CartItemForm
from .auth_routes import validation_errors_to_error_messages

cart_routes = Blueprint('carts', __name__, url_prefix="/cart")

NotFoundError = {"error": "Not Found"}, 404
ForbiddenError = {"error": "Forbidden"}, 403

# GET current cart
@cart_routes.route("")
@login_required
def get_my_cart():
    userId = current_user.id
    cart = ShoppingCart.query.filter(ShoppingCart.user_id == userId).first()
    cartItems = ShoppingCartItems.query.filter(ShoppingCartItems.shoppingCartId == userId)
    if not cartItems:
        error = NotFoundError('No Cart Found, add items to cart!')
        return error.error_json()
    response = [item.to_dict() for item in cartItems]
    return response
    # return {'cart': cartItems}

# REMOVE item from cart
@cart_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def remove_from_cart(id):
    product_to_delete = Product.query.get(id)

    if not product_to_delete:
        error = NotFoundError('Product Not Found')
        return error.error_json()

    cart = ShoppingCart.query.filter(ShoppingCart.user_id == current_user.id).first()
    cart_item_to_delete = ShoppingCartItems.query.filter(ShoppingCartItems.shoppingCartId == cart.id, ShoppingCartItems.productId == id).first()

    if not cart_item_to_delete:
        error = NotFoundError('Item not in cart')
        return error.error_json()

    # update cart total price and product stock quantity
    product_to_delete.quantity += cart_item_to_delete.quantity

    db.session.delete(cart_item_to_delete)
    db.session.commit()

    userId = current_user.id
    cartItems = ShoppingCartItems.query.filter(ShoppingCartItems.shoppingCartId == userId)
    if not cartItems:
        error = NotFoundError('No Cart Found, add items to cart!')
        return error.error_json()
    response = [item.to_dict() for item in cartItems]
    return response

    # return {"message": "Item removed from cart!"}


# UPDATE item quantity in cart
@cart_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_cart_item(id):
    product = Product.query.get(id)

    # if not product:
    #     error = NotFoundError('Product Not Found')
    #     return error.error_json()

    # cart = ShoppingCart.query.filter(ShoppingCart.user_id == current_user.id)
    cart_item_to_update = ShoppingCartItems.query.get(id)

    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():

        cart_item_to_update.quantity = form.data["quantity"]
        db.session.commit()

        userId = current_user.id
        cartItems = ShoppingCartItems.query.filter(ShoppingCartItems.shoppingCartId == userId)
        if not cartItems:
            error = NotFoundError('No Cart Found, add items to cart!')
            return error.error_json()
        response = [item.to_dict() for item in cartItems]
        return response

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# CHECKOUT and clear the cart
@cart_routes.route("/checkout", methods=["POST"])
@login_required
def checkout_cart():
    # Clear the cart
    cart = ShoppingCart.query.filter(ShoppingCart.user_id == current_user.id).first()
    if not cart:
        return {"error": "No cart found for the user"}, 404

    cart_items_to_delete = ShoppingCartItems.query.filter(ShoppingCartItems.shoppingCartId == cart.id).all()
    for item in cart_items_to_delete:
        db.session.delete(item)

    db.session.commit()

    return {"message": "Order placed successfully and cart cleared"}
