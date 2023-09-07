from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.Numeric(precision=6, scale=2), nullable=False)
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    category = db.Column(db.String(50))
    quantity = db.Column(db.Integer)
    # AWS
    image = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime, default=datetime.utcnow())
    updated_at = db.Column(db.DateTime, default=datetime.utcnow())

    # relationship attribute
    users = db.relationship("User", back_populates="products")
    shopping_cart_items = db.relationship("ShoppingCartItems", back_populates="products", cascade="all, delete")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'user_id': self.user_id,
            'category': self.category,
            'quantity': self.quantity,
            'image': self.image,
            'created_at': self.created_at
        }
