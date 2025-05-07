import os
from flask import Flask
from flask_cors import CORS
from backend.common.database import db
from backend.services.home.api import home_bp
from backend.services.login.api import login_bp
from backend.services.payment.api import payment_bp

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:8000"])

    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
        'DATABASE_URL', 'mssql+pymssql://sa:admin@localhost/production_db'
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # Đăng ký các blueprint sau khi khởi tạo app
    app.register_blueprint(login_bp, url_prefix='/api/login')
    app.register_blueprint(home_bp, url_prefix='/api/home')
    app.register_blueprint(payment_bp, url_prefix='/api/payment')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)