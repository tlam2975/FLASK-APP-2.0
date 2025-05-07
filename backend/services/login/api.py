from flask import Blueprint, jsonify, request
from backend.common.database import db

login_bp = Blueprint('login', __name__)

@app.route('/home', methods=['GET'])
def signin():
    data = request.get_json()
    
    # Get user input
    email = data.get('email')
    password = data.get('password')
    
    # Check if user exists and password matches
    user = accounts.query.filter_by(email=email).first()
    
    if user and user.password == password:  # In production, use password hashing!
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'user': user.to_dict()
        }), 200
    else:
        return jsonify({
            'success': False,
            'message': 'Invalid email or password'
        }), 401

@app.route('/home', methods=['POST'])
def signup():
    data = request.get_json()
    new_user = accounts(
        username=data['username'],
        email=data['email'],
        password=data['password']
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.to_dict()), 201
#200 hay 201?

