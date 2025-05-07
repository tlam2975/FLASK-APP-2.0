from flask import Blueprint, jsonify, request
from backend.common.database import db

payment_bp = Blueprint('payment', __name__)

@app.route('/payment', methods=['PUT'])
def create_payment():
    data = request.get_json()
    new_payment = Payment(
        payment_id=data['payment_id'],
        amount=data['amount'],
        method=data['method'],
        status=data['status']
    )
    db.session.add(new_payment)
    db.session.commit()
    return jsonify(new_payment.to_dict()), 201