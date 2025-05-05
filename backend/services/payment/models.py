from backend.common.database import db

class transactions(db.Model):
    __tablename__ = 'transactions'
    id_trans = db.Column(db.Integer, primary_key=True, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id_posts'), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    method = db.Column(db.String(100), nullable=False)
    time = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(100), db.Foreignkey('accounts.id_accounts'), nullable=False)