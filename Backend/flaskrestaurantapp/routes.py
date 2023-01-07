from flaskrestaurantapp.models import User, Products
from flaskrestaurantapp import app
from flask import jsonify, request
from flaskrestaurantapp import db
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import unset_jwt_cookies
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import get_jwt
from flask_bcrypt import Bcrypt
from datetime import timedelta, timezone, datetime
import json
import flask


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
        message = jsonify({"msg": "Missing username parameter"})
        return message, 400
    if not email:
        message = jsonify({"msg": "Missing email parameter"})
        return message, 400
    if not hashed_password:
        message = jsonify({"msg": "Missing password parameter"})
        return message, 400
    user = User.query.filter_by(username=username).first()
    if user:
        message = jsonify({"msg": "Username already exists"})
        return message, 400
    user = User.query.filter_by(email=email).first()
    if user:
        message = jsonify({"msg": "Email already exists"})
        return message, 400
    user = User(username=username, email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()
    response = jsonify({"msg": "User created successfully"})
    return response, 200
  

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
    access_token = create_access_token(identity=user.email)
    refresh_token = create_refresh_token(identity=user.email)
    response = jsonify({'message': 'Login successful'})
    set_access_cookies(response, access_token)
    response.set_cookie('refresh_token', refresh_token, httponly=True)
    return response, 200


@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response

 
  
@app.route('/logout', methods=['DELETE'])
def logout():
    response = jsonify({'message': 'Logout successful'})
    unset_jwt_cookies(response)
    return response, 200

# ===============================

# Refresh token validator
#===============================
def refresh():
    identity = get_jwt_identity()
    access_token = create_access_token(identity=identity)
    return jsonify(access_token=access_token)

#===============================

@app.route('/security', methods=['GET'])
@jwt_required(optional=True)
def optionally_protected():
    current_identity = get_jwt_identity()
    if current_identity:
        return jsonify(logged_in_as=current_identity)
    else:
        return jsonify(logged_in_as="anonymous user")


# Products CRUD operations
# ===============================
@app.route('/products', methods=['GET'])
def getProducts():
    global Products
    productsList = Products.query.all()
    output = []
    for Products in productsList:
        currentProduct = {}
        currentProduct['id'] = Products.id
        currentProduct['product_name'] = Products.product_name
        currentProduct['price'] = Products.price 
        currentProduct['category'] = Products.category
        currentProduct['main_category'] = Products.main_category
        currentProduct['ingredients'] = Products.ingredients
        output.append(currentProduct)
    return jsonify(output), 200


@app.route('/products/<int:id>/', methods=['PUT'])
@jwt_required()
def updateProducts(id):
    current_identity = get_jwt_identity()
    if current_identity == 'admin@yahoo.com' or current_identity == 'super@yahoo.com':
        data = request.get_json()
        currentProduct = Products.query.get(id)
        currentProduct.product_name = data['product_name']
        currentProduct.price = data['price']
        currentProduct.category = data['category']
        currentProduct.main_category = data['main_category']
        currentProduct.ingredients = data['ingredients']
        db.session.commit()
        return jsonify({'message': 'Product updated!'}), 200
    else:
        return jsonify({'message': 'Acces forbidden!'}), 401



@app.route('/products/<int:id>/', methods=['DELETE'])
@jwt_required()
def  deleteProduct(id):
    current_identity = get_jwt_identity()
    if current_identity == 'admin@yahoo.com':
        currentProduct = Products.query.get(id)
        db.session.delete(currentProduct)
        db.session.commit()
        return jsonify({'message': 'Product deleted!'}), 204
    else:
        return jsonify({'message': 'Acces forbidden!'}), 401


@app.route('/products', methods=['POST'])
@jwt_required()
def postProducts():
    current_identity = get_jwt_identity()
    if current_identity == 'admin@yahoo.com' or current_identity == 'super@yahoo.com':
        productData = request.get_json()
        product = Products(
                    product_name=productData['product_name'], 
                    price=productData['price'], 
                    category=productData['category'],
                    ingredients=productData['ingredients'],
                    main_category=productData['main_category']     
                )
        db.session.add(product)
        db.session.commit()
        return jsonify(productData)
    else:
        return jsonify({'message': 'Acces forbidden!'}), 401

# ===============================
