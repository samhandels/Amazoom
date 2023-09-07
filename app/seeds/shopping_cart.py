from app.models import db, ShoppingCart, environment, SCHEMA
from sqlalchemy.sql import text

def seed_shopping_carts():
    demo_cart = ShoppingCart(user_id=1)
    marnie_cart = ShoppingCart(user_id=2)
    bobbie_cart = ShoppingCart(user_id=3)

#add to db
    carts = [demo_cart, marnie_cart, bobbie_cart]
    add_carts = [db.session.add(cart) for cart in carts]

    db.session.commit()

    print("shopping cart added to DB")



def undo_shopping_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.shopping_carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM shopping_carts"))

    db.session.commit()
