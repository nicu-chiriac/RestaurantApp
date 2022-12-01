from flaskrestaurantapp.models import User, Products
from flask import Flask, session
import flask
from flaskrestaurantapp import app
from flask import jsonify, request
import json
import functools
from flaskrestaurantapp import db
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import unset_jwt_cookies
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity
from flask_bcrypt import Bcrypt


bcrypt = Bcrypt(app)

# Authentication
# =============================== 
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"msg": "Missing JSON in request"}), 400
    username = data['username']
    email = data['email']
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not email:
        return jsonify({"msg": "Missing email parameter"}), 400
    if not hashed_password:
        return jsonify({"msg": "Missing password parameter"}), 400
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({"msg": "Username already exists"}), 400
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"msg": "Email already exists"}), 400
    user = User(username=username, email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"msg": "User created successfully"}), 200
  

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"msg": "Missing JSON in request"}), 400
    email = data['email']
    password = data['password']
    if not email:
        return jsonify({"msg": "Missing email parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Bad username or password"}), 401
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identity=user.username)
    refresh_token = create_refresh_token(identity=user.username)
    resp = jsonify({'message': 'Login successful'})
    set_access_cookies(resp, access_token)
    resp.set_cookie('refresh_token', refresh_token, httponly=True)
    return resp, 200
 
  
@app.route('/logout', methods=['POST'])
def logout():
    response = jsonify({'message': 'Logout successful'})
    unset_jwt_cookies(response)
    return response, 200

# ===============================


# Products CRUD operations
# ===============================
@app.route('/products', methods=['GET'])
def getProducts():
    global Products
    productsList = Products.query.all()
    output = []
    for Products in productsList:
        currentProduct = {}
        currentProduct['product_name'] = Products.product_name
        currentProduct['price'] = Products.price 
        currentProduct['category'] = Products.category
        currentProduct['description'] = Products.description 
        currentProduct['ingredients'] = Products.ingredients
        currentProduct['allergens'] = Products.allergens
        output.append(currentProduct)
    return jsonify(output)


@app.route('/products/<int:id>/', methods=['PUT'])
@jwt_required()
def updateProducts(id):
    data = request.get_json()
    currentProduct = Products.query.get(id)
    currentProduct.product_name = data['product_name']
    currentProduct.price = data['price']
    currentProduct.category = data['category']
    currentProduct.description = data['description']
    currentProduct.ingredients = data['ingredients']
    currentProduct.allergens = data['allergens']
    db.session.commit()
    return jsonify({'message': 'Product updated!'})


@app.route('/products/<int:id>/', methods=['DELETE'])
@jwt_required()
def  deleteProduct(id):
    currentProduct = Products.query.get(id)
    db.session.delete(currentProduct)
    db.session.commit()
    return jsonify({'message': 'Product deleted!'})


@app.route('/products', methods=['POST'])
@jwt_required()
def postProducts():
    productData = request.get_json()
    product = Products(
                product_name=productData['product_name'], 
                price=productData['price'], 
                category=productData['category'], 
                description=productData['description'], 
                ingredients=productData['ingredients'], 
                allergens=productData['allergens']    
            )
    db.session.add(product)
    db.session.commit()
    return jsonify(productData)

# ===============================
