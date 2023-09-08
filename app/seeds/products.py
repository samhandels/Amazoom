from app.models import db, Product, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text


def seed_products():
    product1 = Product(
        name='2023 MacBook Pro',
        price=1999.95,
        description='Apple 2023 MacBook Pro Laptop M2 Pro chip with 10‑core CPU and 16‑core GPU: 14.2-inch Liquid Retina XDR Display, 16GB Unified Memory, 512GB SSD Storage',
        user_id=1,
        category='Electronics',
        quantity=10,
        image='https://m.media-amazon.com/images/I/61lYIKPieDL._AC_SL1500_.jpg'
    )
    product2 = Product(
        name='The Four Agreements: A Practical Guide to Personal Freedom',
        price=7.75,
        description='In The Four Agreements, bestselling author don Miguel Ruiz reveals the source of self-limiting beliefs that rob us of joy and create needless suffering. Based on ancient Toltec wisdom, The Four Agreements offer a powerful code of conduct that can rapidly transform our lives to a new experience of freedom, true happiness, and love.',
        user_id=2,
        category='Books',
        quantity=5,
        image='https://m.media-amazon.com/images/I/61bzSxyLLlL.jpg'
    )
    product3 = Product(
        name='2021 TaylorMade Distance+ Golf Balls',
        price=17.99,
        description='Distance Golf Balls by TaylorMade',
        user_id=3,
        category='Sports & Outdoors',
        quantity=15,
        image='https://m.media-amazon.com/images/I/81vThuvUBxL._AC_SL1500_.jpg'
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
