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
    print("inside getCart route --------------------------------------")
    userId = current_user.id
    cart1 = ShoppingCart.query.filter(ShoppingCart.user_id == userId)
    print("userId and cart in getCart route ------------------------------",userId, cart1)
    if not cart1:
        error = NotFoundError('No Cart Found, add items to cart!')
        return error.error_json()
    response = [cart.to_dict() for cart in cart1]
    return {'cart': response}

# REMOVE item from cart
@cart_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def remove_from_cart(id):
    product_to_delete = Product.query.get(id)

    if not product_to_delete:
        error = NotFoundError('Product Not Found')
        return error.error_json()

    cart = ShoppingCart.query.filter(ShoppingCart.user_id == current_user.id).first()
    cart_item_to_delete = ShoppingCartItems.query.filter(ShoppingCartItems.cart_id == cart.id, ShoppingCartItems.product_id == id).first()

    if not cart_item_to_delete:
        error = NotFoundError('Item not in cart')
        return error.error_json()

    # update cart total price and product stock quantity
    cart.total_price -= cart_item_to_delete.subtotal
    product_to_delete.stock_quantity += cart_item_to_delete.quantity

    db.session.delete(cart_item_to_delete)
    db.session.commit()

    # delete empty carts
    if len(cart.cart_items) == 0:
        db.session.delete(cart)
        db.session.commit()

    return {"message": "Item removed from cart!"}

# UPDATE item quantity in cart
@cart_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_cart_item(id):
    product = Product.query.get(id)

    if not product:
        error = NotFoundError('Product Not Found')
        return error.error_json()

    cart = ShoppingCart.query.filter(ShoppingCart.user_id == current_user.id).first()
    cart_item_to_update = ShoppingCartItems.query.filter(ShoppingCartItems.cart_id == cart.id, ShoppingCartItems.product_id == id).first()

    old_subtotal = cart_item_to_update.subtotal
    old_quantity = cart_item_to_update.quantity

    if not cart_item_to_update:
        error = NotFoundError('Item not in cart')
        return error.error_json()

    form = CartItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        cart_item_to_update.quantity = form.data["quantity"]
        cart_item_to_update.subtotal = product.price * form.data["quantity"]

        cart.total_price -= old_subtotal
        cart.total_price += cart_item_to_update.subtotal

        product.stock_quantity += old_quantity
        product.stock_quantity -= cart_item_to_update.quantity

        db.session.commit()

        return {"cart_item": cart_item_to_update.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
