from app.models import db, Product, environment, SCHEMA
from datetime import datetime

def seed_products():
    product1 = Product(
        name='Sample Product 1',
        price=12.95,
        description='Description for Sample Product 1',
        user_id=1,
        category='Category1',
        quantity=10,
        image='path/to/sample/image1.jpg'
    )
    product2 = Product(
        name='Sample Product 2',
        price=11.95,
        description='Description for Sample Product 2',
        user_id=2,
        category='Category2',
        quantity=5,
        image='path/to/sample/image2.jpg'
    )
    product3 = Product(
        name='Sample Product 3',
        price=10.95,
        description='Description for Sample Product 3',
        user_id=3,
        category='Category3',
        quantity=1,
        image='path/to/sample/image3.jpg'
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)

    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
