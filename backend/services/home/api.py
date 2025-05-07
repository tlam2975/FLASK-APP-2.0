from flask import Blueprint, jsonify, request
from backend.common.database import db

home_bp = Blueprint('home', __name__)

@app.route('/home', methods=['GET'])
# def get_posts():
#     posts = db.session.query(Posts).all()
#     posts_data = [post.to_dict() for post in posts]
#     # return render_template('home.html', posts=posts_data)
#     return jsonify(posts_data)
def get_posts():
    posts = db.session.query(Posts).all()
    posts_data = [post.to_dict() for post in posts]
    return render_template('frontend/home.html', posts=posts_data)

@app.route('/home', methods=['POST'])
def create_post():
    data = request.get_json()
    new_post = Posts(
        header=data['header'],
        price=data['price'],
        description=data['description'],
        picture=data['picture'],
        contact=data['contact']
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify(new_post.to_dict()), 201
#200 hay 201?
