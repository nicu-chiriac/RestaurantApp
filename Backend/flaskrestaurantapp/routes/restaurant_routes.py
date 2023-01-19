from flaskrestaurantapp.models import User, Products
from factory import db
from flask import request, jsonify, Blueprint
from flask_jwt_extended import (
    jwt_required, 
    get_jwt_identity
    )

restaurant_routes_bp = Blueprint('restaurant_routes', __name__)

# Products CRUD operations

@restaurant_routes_bp.route('/products', methods=['GET'])
def getProducts():
    productList = Products.query.all()
    output = []
    for productItem in productList:
        product_data = {}
        product_data['id'] = productItem.id
        product_data['product_name'] = productItem.product_name
        product_data['price'] = productItem.price
        product_data['category'] = productItem.category
        product_data['main_category'] = productItem.main_category
        product_data['ingredients'] = productItem.ingredients
        output.append(product_data)
    return jsonify(output), 200
    

@restaurant_routes_bp.route('/products/<int:id>/', methods=['PUT'])
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

@restaurant_routes_bp.route('/products/<int:id>/', methods=['DELETE'])
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

@restaurant_routes_bp.route('/products', methods=['POST'])
@jwt_required()
def postProducts():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    role = user.role

    if not request.is_json:
        return jsonify({'message': 'Missing JSON in request'}), 400

    product_data = request.get_json()
    newProductName = product_data.get('product_name')
    newproductPrice = product_data.get('price')
    newProductCategory = product_data.get('category')
    newProductIngredients = product_data.get('ingredients')
    newProductMainCategory = product_data.get('main_category')

    if not newProductName or not newproductPrice or not newProductCategory or not newProductIngredients or not newProductMainCategory:
        return jsonify({'message': 'Missing required data fields'}), 400

    if role not in ['admin', 'super']:
        return jsonify({'message': 'Acces forbidden!'}), 401

    newProduct = Products(product_name=newProductName, price=newproductPrice, category=newProductCategory,
                      ingredients=newProductIngredients, main_category=newProductMainCategory)

    db.session.add(newProduct)
    db.session.commit()

    return jsonify(product_data), 201

