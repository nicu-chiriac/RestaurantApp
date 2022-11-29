from flaskrestaurantapp.models import User, Products
from flask import Flask, session
import flask
from flaskrestaurantapp import app
from flask import jsonify, request
import json
import functools
from flaskrestaurantapp import db


#Un model de validator
def validate_request(f):
  @functools.wraps(f)
  def decorated_function(*args, **kws):
    data = flask.request.get_json()
    if not data:
      flask.abort(404)
    return f(*args, **kws)
  return decorated_function

# O ruta de test
@app.route('/test', methods=['GET', 'POST'])
def test():
    if request.method == "GET":
        return jsonify({"response": "Get request succesfull"})
    elif request.method == "POST":
        name = request.json['name']
        return jsonify({"response": "Hi " + name})


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


@app.route('/products', methods=['POST'])
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


@app.route('/')
def index():
    return "Hello World"

