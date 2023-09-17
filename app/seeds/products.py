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
    product4 = Product(
        name='Crocs Unisex-Adult Classic Clogs',
        price=29.99,
        description='100% Synthetic. Imported. Ethylene Vinyl Acetate sole. Measures approximately 8 inches. Heel measures approximately 0.77. Crocs For Women And Men: The Crocs Classic Clogs Are Not Only The Most Comfortable Shoes For Women And Men But Also Easy To Clean Just Using Soap And Water And Allowing For A Quick Dry. Lightweight And Fun: The Crocs For Men And Women Feature Lightweight Iconic Crocs Comfort. Ventilation Ports Add Breathability And Help Shed Water And Debris Quickly.',
        user_id=2,
        category='Amazon Basics',
        quantity=15,
        image='https://m.media-amazon.com/images/I/81Vekenn4lL._AC_UX695_.jpg'
    )
    product5 = Product(
        name='DEERC D20 Mini Drone for Kids with 720P HD FPV Camera Remote Control',
        price=50.99,
        description='HD Pictures and Live Videos: D20 equipped with 720P HD Wi-Fi camera to take better aerial photos and videos; with FPV transmission, you can see the sky from a live video feed through smartphone app. Best Drone Toy for Kids: Fly D20 is magically simple, just tap the One Key Start/Landing button to start the fly; Altitude Hold can maintain the drone at a certain height, which makes it so easy to control and take high quality footage.',
        user_id=1,
        category='Electronics',
        quantity=20,
        image='https://m.media-amazon.com/images/I/71O90hq0utL._AC_SL1500_.jpg'
    )
    product6 = Product(
        name='Artechworks Velvet Modern Tub Barrel Arm Chair Upholstered Tufted with Gold Metal Legs',
        price=352.99,
        description='Elegant Design:Our unique luxe accent chair with metal base and contrast color fabric infuses an exquisite accent to your main furniture to create that modern cozy atmosphere in your home and enhances the surrounding décor. Sturdy Structure: Metal Legs and wooden frame living room chair matches the high density sponge add the steady and durablity of the whole chair. Multi-Funtional - Can be used in multiple room settings: as a vanity chair, dressing chair, accent chair, side chair, club chair. It is perfect for decor your living room bedroom dining room, office and guest room.',
        user_id=3,
        category='Home',
        quantity=10,
        image='https://m.media-amazon.com/images/I/81BszHjWyQL._AC_SL1500_.jpg'
    )
    product7 = Product(
        name='Bedsure Orthopedic Dog Bed for Medium Dogs',
        price=39.99,
        description='Orthopedic Support: Our orthopedic dog sofa is designed to give your pet unparalleled support for a deep, dreamy sleep. High-density egg-crate foam helps distribute weight evenly and provides the perfect amount of pressure relief and joint support. Enhanced Comfort: The 4-sided bolster design promotes ultimate comfort and security, offering your pet a variety of cozy positions to snuggle. The cushioned bolster shape is deeply filled to support your pet’s head and neck for a more restful sleep. And the lowered entrance protects your pets knees and promotes accessibility.',
        user_id=2,
        category='Pet Supplies',
        quantity=16,
        image='https://m.media-amazon.com/images/I/71TgLdByn5L._AC_SL1500_.jpg'
    )
    product8 = Product(
        name='HUONUL Makeup Mirror Vanity Mirror with Lights',
        price=24.99,
        description='Built in 21 LED bulbs; HUONUL makeup mirror provides a good brightness for makeup; dim or brighten up the lights with a long pressing of touch screen switch. Dual power supply; makeup mirror with lights powered by USB charging cable or 4xAAA batteries; USB cable included, Charger and batteries not included.',
        user_id=3,
        category='Beauty',
        quantity=20,
        image='https://m.media-amazon.com/images/I/51sdlEpzVBL._AC_SL1500_.jpg'
    )
    product9 = Product(
        name='Square Sticky Notes, 3 x 3-Inch, Assorted Colors, 24-Pack',
        price=9.99,
        description='Sticky notes for messages, lists, reminders, and more; ideal for work, home, or school. Includes 24 notepads with 70 sheets of paper per pad (1680 sheets total) in an assortment of colors. Water-based microsphere adhesive on the back can be easily attached and re-attached.',
        user_id=2,
        category='Other',
        quantity=30,
        image='https://m.media-amazon.com/images/I/612D4riBcSL._AC_SL1500_.jpg'
    )
    product10 = Product(
        name='Sharpie Permanent Markers, Fine Point, Black, 12 Count',
        price=5.99,
        description='Proudly permanent ink marks on paper, plastic, metal, and most other surfaces. Intensely brilliant Colors create eye popping, Vibrant impressions. Remarkably resilient ink dries quickly and resists fading and Water; AP certified.',
        user_id=1,
        category='Other',
        quantity=15,
        image='https://m.media-amazon.com/images/I/7138AKuwbZL._AC_SL1500_.jpg'
    )
    product11 = Product(
        name='Amazon Basics 3-Button Wired USB Computer Mouse, Single, Black',
        price=7.99,
        description='Computer mouse for easily navigating a computer interface; click, scroll, and more. Includes a USB-connected wired black mouse with 3 buttons for effortless fingertip control. High-definition (1000 dpi) optical tracking ensures responsive cursor control for precise tracking and easy text selection.',
        user_id=2,
        category='Amazon Basics',
        quantity=15,
        image='https://m.media-amazon.com/images/I/61i0CV-tKpL._AC_SL1500_.jpg'
    )
    product12 = Product(
        name='The 48 Laws of Power',
        price=14.99,
        description='Amoral, cunning, ruthless, and instructive, this multi-million-copy New York Times bestseller is the definitive manual for anyone interested in gaining, observing, or defending against ultimate control – from the author of The Laws of Human Nature.',
        user_id=3,
        category='Books',
        quantity=13,
        image='https://m.media-amazon.com/images/I/71aG+xDKSYL._SL1500_.jpg'
    )

    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    db.session.add(product11)
    db.session.add(product12)


    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
