from app.models import db, Product, environment, SCHEMA
from datetime import datetime
from sqlalchemy.sql import text


def seed_products():
    product1 = Product(
        name='2023 MacBook Pro',
        price=1999.95,
        description='Apple 2023 MacBook Pro Laptop M2 Pro chip with 10‑core CPU and 16‑core GPU. 14.2-inch Liquid Retina XDR Display, 16GB Unified Memory, 512GB SSD Storage. Perfect for the modern day student or employee.',
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
        description='Distance Golf Balls by TaylorMade. React Speed Core. 342 Aerodynamic Dimple Pattern. 2 Layer Construction, Ionomer Cover, Mid-Launch, Max Distance, Mid/High Spin, And Softer Feel.',
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
        name='Samazon Basics 3-Button Wired USB Computer Mouse, Single, Black',
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
    product13 = Product(
        name='LEGO Marvel Hulkbuster 76210 Building Set - Avengers Movie',
        price=214.99,
        description='Movie Collectible Colossus - This 4,049-piece LEGO Marvel Hulkbuster captures the scale and power of the Hulkbuster MK44 from Marvel Studios Avengers: Age of Ultron. Authentic Model Details - Features 3 light-up arc reactors (1 in chest, 1 in each hand), fully jointed upper body, and spacious, opening cockpit.',
        user_id=2,
        category='Other',
        quantity=15,
        image='https://m.media-amazon.com/images/I/81R9CxlQBFL._AC_SL1500_.jpg'
    )
    product14 = Product(
        name='Samazon Basics Stainless Steel Comfort Grip Knife Set with Block, 18-Piece',
        price=54.99,
        description='18 piece knife set; great for chopping, cutting, slicing, peeling and other everyday food prep tasks. High carbon stainless steel blades with a satin finish are stain, rust and pit resistant. Brushed stainless steel handles offer a secure and comfortable grip.',
        user_id=1,
        category='Amazon Basics',
        quantity=19,
        image='https://m.media-amazon.com/images/I/81payciogQL._AC_SL1500_.jpg'
    )
    product15 = Product(
        name='Big and Tall Mesh Office Chair with Adjustable Arms and Lumbar Support',
        price=114.99,
        description='Big and tall rolling desk chair with mesh back for use in offices, conference rooms and more. Design with integrated back support for all-day comfort. Adjustable pneumatic height mechanism and adjustable arm rests.',
        user_id=3,
        category='Home',
        quantity=20,
        image='https://m.media-amazon.com/images/I/617t77NgO8L._AC_SL1500_.jpg'
    )
    product16 = Product(
        name='Apple iPad (9th Generation): with A13 Bionic chip, 10.2-inch Retina Display, 64GB, Wi-Fi, 12MP front/8MP Back Camera, Touch ID, All-Day Battery Life',
        price=244.99,
        description='All the essentials in the most affordable iPad, with a beautiful 10-inch Retina display, powerful A13 Bionic chip, and an Ultra Wide front camera with Center Stage. Work, play, create, learn, stay connected, and more.',
        user_id=2,
        category='Electronics',
        quantity=30,
        image='https://m.media-amazon.com/images/I/61NGnpjoRDL._AC_SL1500_.jpg'
    )
    product17 = Product(
        name='Mighty Patch Original from Hero Cosmetics - Hydrocolloid Acne Pimple Patch for Covering Zits and Blemishes',
        price=10.99,
        description='The Original Award-Winning Acne Patch: Mighty Patch is a hydrocolloid sticker that improves the look of pimples overnight without the popping. Just stick it on, get some sleep, and wake up with clearer-looking skin. Results in 6-8 Hours: Absorbs pimple gunk thanks to our medical-grade hydrocolloid. Clinically tested, drug-free, and safe for all skin types.',
        user_id=1,
        category='Beauty',
        quantity=25,
        image='https://m.media-amazon.com/images/I/51YlAYwPx6L._SL1500_.jpg'
    )
    product18 = Product(
        name='Neutrogena Cleansing Fragrance Free Makeup Remover Face Wipes',
        price=14.99,
        description='Twin pack of 25 count of soft, pre-moistened Neutrogena Makeup Remover Cleansing Towelettes to remove makeup and effectively cleanse skin in one easy step. Makeup remover towelettes work to dissolve all traces of dirt, oil and makeup on skin, for superior cleansing and makeup removing power at your fingertips. Removes even stubborn waterproof mascara - with these eye makeup remover wipes which are specially formulated to be gentle on the eyes, so they are safe enough for contact lens wearers.',
        user_id=3,
        category='Beauty',
        quantity=18,
        image='https://m.media-amazon.com/images/I/71PXjjbQCzL._SL1500_.jpg'
    )
    product19 = Product(
        name='Hanes Mens EcoSmart Fleece Sweatshirt, Cotton-Blend Pullover',
        price=11.99,
        description='50% Cotton, 50% Polyester. Imported. Pull On closure. Machine Wash. FLEECE TO FEEL GOOD ABOUT - Hanes EcoSmart midweight sweatshirt is made with cotton sourced from American farms.',
        user_id=2,
        category='Other',
        quantity=15,
        image='https://m.media-amazon.com/images/I/71fyw1U54GL._AC_UX679_.jpg'
    )
    product20 = Product(
        name='Pet Potty Training Pads for Dogs Puppy Pads, Pee Pads, Quick Absorb',
        price=24.99,
        description='Heavy duty absorbent core can hold up to 2 cups of liquid. Leak-proof plastic lining and locking layers protect the floor and carpet. 6 layers.Pad dimension: 22 x 22 inches. 100-count.',
        user_id=1,
        category='Pet Supplies',
        quantity=14,
        image='https://m.media-amazon.com/images/I/61rV7AbNcQL._AC_SL1000_.jpg'
    )
    product21 = Product(
        name='Pet Hair Remover for Couch, 4 PCS Dog Hair Remover for Couch, Efficient Pet Hair Removal Tool',
        price=11.99,
        description='Package Includes 2 PCS metal pet hair remover for couch, a silicone Y-shaped dog hair remover for car, a TPR cloud-shaped brush and a storage bag. These 3 kinds of carpet scraper can deal with different fabric surfaces and give you more options. Metal dog hair remover for couch has a pure copper head to remove stubbornly trapped pet hair quickly.',
        user_id=3,
        category='Pet Supplies',
        quantity=20,
        image='https://m.media-amazon.com/images/I/71peyl4YjWL._AC_SL1500_.jpg'
    )
    product22 = Product(
        name='Personalized Dog Tag with 5 Lines of Custom Deep Engraved Durable Stainless Steel',
        price=9.99,
        description='Our engraved dog cat tags personalized solid stainless steel have color plating in Gold, Rose Gold, Blue, Black, Nebula are incredibly durable and long-lasting. The permanent laser engraving is clear to read on an attractive, polished tag. Available in 2 sizes for cat or dog from small to large.',
        user_id=2,
        category='Pet Supplies',
        quantity=20,
        image='https://m.media-amazon.com/images/I/81tJTELOtkL._AC_SL1500_.jpg'
    )
    product23 = Product(
        name='Queen Size 4 Piece Bedding Sheet Set - Breathable & Cooling Bed Sheets',
        price=24.99,
        description='4 PIECE BED SHEET SET: 2 pillow cases and a flat sheet and fitted sheet. DEEP POCKETS/ EASY FIT: They fit mattresses up to around 16 inches deep. If your mattress is smaller than 16 inches it will fit just fine. A lot of mattresses are pretty big these days and we feel this is a good universal size that fits most mattresses.',
        user_id=1,
        category='Home',
        quantity=15,
        image='https://m.media-amazon.com/images/I/61nY9nYn30L._AC_SL1500_.jpg'
    )
    product24 = Product(
        name='Funko Pop! Advent Calendar - DC Super Heroes 2023',
        price=34.99,
        description='Countdown to your favorite holiday, or any special occasion, with the DC Super Heroes 24 Day Advent Calendar! Open the tiny doors to reveal 24 unique Funko Pocket Pops! featuring some of your most beloved heroes and villains dressed in holiday ensembles or styled in gingerbread form! Who will be the next to join your DC super heroes collection?',
        user_id=3,
        category='Other',
        quantity=25,
        image='https://m.media-amazon.com/images/I/81vJ4Z+CXML._AC_SL1500_.jpg'
    )
    product25 = Product(
        name='Ring Floodlight Cam Wired Plus with motion-activated 1080p HD video, Black (2021 release)',
        price=114.99,
        description='1080p HD security camera with motion-activated LED floodlights, 105dB security siren, Two-Way Talk, and customizable motion zones. Get motion-activated notifications on your phone, tablet or PC and check in at home anytime with Live View all in the Ring app. Customize motion zones in the Ring app to fine-tune which areas you want to focus on.',
        user_id=2,
        category='Electronics',
        quantity=15,
        image='https://m.media-amazon.com/images/I/51X2knRYlhL._SL1000_.jpg'
    )
    product26 = Product(
        name='Samazon Basics 20-Inch Hardside Spinner, Black',
        price=54.99,
        description='20-inch hardside spinner luggage for work travel, vacations, or as international carry-on. Reliable strength with extra-thick ABS hard shell, scratch resistant Black finish, and fully lined 150D-polyester interior. Easy to move with 4 double spinner wheels, telescoping handle, and short handle.',
        user_id=1,
        category='Amazon Basics',
        quantity=15,
        image='https://m.media-amazon.com/images/I/71s7HbyqzEL._AC_SL1500_.jpg'
    )
    product27 = Product(
        name='SPARK CATCH Light Up Baseball, Glow in The Dark Baseball, Perfect Baseball Gifts for Boys, Girls, Adults, and Baseball Fans',
        price=24.99,
        description='The newest version comes with an on/off switch. Makes great baseball gifts for boys 8-12 12-14 and girls, teens and adults. The LED light up baseball has the same size, weight, handmade stitches, and genuine cow leather as an official baseball for the best grip. Perfect baseball accessory, equipment, stuff for baseball practice.',
        user_id=3,
        category='Sports & Outdoors',
        quantity=15,
        image='https://m.media-amazon.com/images/I/71eSaEU7fIL._AC_SL1500_.jpg'
    )
    product28 = Product(
        name='GlowCity Glow in The Dark Basketball for Teens',
        price=34.99,
        description='30 HOURS OF GLOW - Perfect for kids, teens and the whole family! This size 7 (29.5") LED basketball features 2 lights that are good for up to 30 hours of nighttime play. IMPACT ACTIVATED - Ready to glow up the night? Our bright red basketball illuminates from the inside with a bounce and automatically shuts off when not in use.',
        user_id=2,
        category='Sports & Outdoors',
        quantity=14,
        image='https://m.media-amazon.com/images/I/81GnD0GIhQL._AC_SL1500_.jpg'
    )
    product29 = Product(
        name='Bones Reds Bearings 8-Pack & T-Tool',
        price=24.99,
        description='We promise you will be stoked on this or your money back. Bones Reds are some of the best bearings in the world for a reason, they are awesome! Bones Bearings are bearing size 608, which measures 22mm (outer diameter) x 7mm (width) x 8mm (inner diameter/axle). Each tool has a 9/16" (kingpin), 1/2" (axle), and 3/8" (hardware) Sockets, 1/8" Allen and #2 Phillips Driver and made from hardened steel with a chrome finish.',
        user_id=1,
        category='Sports & Outdoors',
        quantity=20,
        image='https://m.media-amazon.com/images/I/61UokmQUPsL._SL1500_.jpg'
    )
    product30 = Product(
        name='The Alchemist, 25th Anniversary: A Fable About Following Your Dream',
        price=14.99,
        description='A special 25th anniversary edition of the extraordinary international bestseller, including a new Foreword by Paulo Coelho. Combining magic, mysticism, wisdom and wonder into an inspiring tale of self-discovery, The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations. Paulo Coelho\'s masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined. Santiago\'s journey teaches us about the essential wisdom of listening to our hearts, of recognizing opportunity and learning to read the omens strewn along life\'s path, and, most importantly, to follow our dreams.',
        user_id=3,
        category='Books',
        quantity=25,
        image='https://m.media-amazon.com/images/I/71zHDXu1TaL._SL1500_.jpg'
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
    db.session.add(product13)
    db.session.add(product14)
    db.session.add(product15)
    db.session.add(product16)
    db.session.add(product17)
    db.session.add(product18)
    db.session.add(product19)
    db.session.add(product20)
    db.session.add(product21)
    db.session.add(product22)
    db.session.add(product23)
    db.session.add(product24)
    db.session.add(product25)
    db.session.add(product26)
    db.session.add(product27)
    db.session.add(product28)
    db.session.add(product29)
    db.session.add(product30)


    db.session.commit()

def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
