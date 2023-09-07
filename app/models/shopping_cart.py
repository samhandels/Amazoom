from .db import db, environment, SCHEMA, add_prefix_for_prod


class ShoppingCart(db.Model):
    __tablename__ = 'shopping_carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

#relationship attribute
    users = db.relationship("User", back_populates="shopping_carts")
    shopping_cart_items = db.relationship("ShoppingCartItems", back_populates="shopping_carts", cascade="all, delete")


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id
        }
