from factory import create_app, db
from flaskrestaurantapp.routes.auth_routes import auth_routes_bp
from flaskrestaurantapp.routes.restaurant_routes import restaurant_routes_bp

app = create_app()
app.register_blueprint(auth_routes_bp)
app.register_blueprint(restaurant_routes_bp)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run()
