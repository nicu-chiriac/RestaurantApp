from flaskrestaurantapp.models import User
from factory import db, bcrypt
from flask import request, jsonify, make_response, Blueprint
from flask_jwt_extended import (
    jwt_required, get_jwt_identity, set_access_cookies,
    set_refresh_cookies, unset_jwt_cookies,
    create_access_token, create_refresh_token,
    )

auth_routes_bp = Blueprint('auth_routes', __name__)

# Create tokens 
def create_tokens(user_id):
    access_token = create_access_token(identity=user_id)
    refresh_token = create_refresh_token(identity=user_id)
    resp = make_response()
    set_refresh_cookies(resp, refresh_token)
    return access_token, refresh_token, resp

# Register route
@auth_routes_bp.route('/register', methods=['POST'])
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
@auth_routes_bp.route('/login', methods=['POST'])
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
@auth_routes_bp.route('/products/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    user_id = get_jwt_identity()
    access_token = create_access_token(identity=user_id)
    resp = jsonify({'access_token': access_token})
    set_access_cookies(resp, access_token)
    return resp, 200

# Logout route
@auth_routes_bp.route('/logout', methods=['DELETE'])
def logout():
    response = jsonify({'message': 'Logout successful'})
    unset_jwt_cookies(response)
    return response, 200

# Security route
@auth_routes_bp.route('/security', methods=['GET'])
@jwt_required(optional=True)
def optionally_protected():
    user_id = get_jwt_identity()
    if user_id:
        user = User.query.filter_by(id=user_id).first()
        if user:
            return jsonify(logged_in_as=user.email)
        else:
            return jsonify(message="Invalid token"), 401
    else:
        return jsonify(logged_in_as="anonymous user"), 200
