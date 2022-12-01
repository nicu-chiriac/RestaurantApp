from datetime import datetime
from flaskrestaurantapp import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.Text(), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='user')
    created_at = db.Column(db.DateTime, default=datetime.now())

    def __repr__(self):
        return f"User('{self.username}' , '{self.email}')"


class Products(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float(), nullable=False)
    category = db.Column(db.String(20))
    description = db.Column(db.Text())
    ingredients = db.Column(db.Text())
    allergens = db.Column(db.Text())

    def __repr__(self):
        return f"Products('{self.product_name}' , '{self.price}' , '{self.category}' , '{self.description}', '{self.ingredients}', '{self.allergens}')"
