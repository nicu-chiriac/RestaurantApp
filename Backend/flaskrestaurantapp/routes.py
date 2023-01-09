from flaskrestaurantapp.models import User, Products
from flaskrestaurantapp import app
from flaskrestaurantapp import db
from flask import request, jsonify, make_response
from flask_jwt_extended import (
    jwt_required, get_jwt_identity, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies,
    create_access_token, create_refresh_token,
    )
from flask_bcrypt import Bcrypt

# Authentication
#=================================
bcrypt = Bcrypt(app)

# Create tokens 
def create_tokens(user_id):
    access_token = create_access_token(identity=user_id)
    refresh_token = create_refresh_token(identity=user_id)
    resp = make_response()
    set_refresh_cookies(resp, refresh_token)
    return access_token, refresh_token, resp

# Register route
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

# Login route
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
    access_token, refresh_token, resp = create_tokens(user.id)
    response = jsonify({'message': 'Login successful'})
    set_access_cookies(response, access_token)
    set_refresh_cookies(response, refresh_token)

    return response, 200

# Refresh route
@app.route('/products/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    access_token = create_access_token(identity=user_id)
    resp = jsonify({'access_token': access_token})
    set_access_cookies(resp, access_token)
    return resp, 200

# Logout route
@app.route('/logout', methods=['DELETE'])
def logout():
    response = jsonify({'message': 'Logout successful'})
    unset_jwt_cookies(response)
    return response, 200

# Security route
@app.route('/security', methods=['GET'])
@jwt_required(optional=True)
def optionally_protected():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if user_id:
        return jsonify(logged_in_as=user.email)
    else:
        return jsonify(logged_in_as="anonymous user")

# Products CRUD operations
#=================================
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
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    role = user.role
    if role in ['admin', 'super']:
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
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    role = user.role
    if role == 'admin' :
        currentProduct = Products.query.get(id)
        db.session.delete(currentProduct)
        db.session.commit()
        return jsonify({'message': 'Product deleted!'}), 204
    else:
        return jsonify({'message': 'Acces forbidden!'}), 401

@app.route('/products', methods=['POST'])
@jwt_required()
def postProducts():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    role = user.role

    if not request.is_json:
        return jsonify({'message': 'Missing JSON in request'}), 400

    product_data = request.get_json()
    product_name = product_data.get('product_name')
    price = product_data.get('price')
    category = product_data.get('category')
    ingredients = product_data.get('ingredients')
    main_category = product_data.get('main_category')

    if not product_name or not price or not category or not ingredients or not main_category:
        return jsonify({'message': 'Missing required data fields'}), 400

    if role not in ['admin', 'super']:
        return jsonify({'message': 'Acces forbidden!'}), 401

    product = Products(product_name=product_name, price=price, category=category,
                      ingredients=ingredients, main_category=main_category)

    db.session.add(product)
    db.session.commit()

    return jsonify(product_data), 201

