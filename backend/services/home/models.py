from backend.common.database import db

class posts(db.Model):
    __tablename__ = 'posts'
    id_posts = db.Column(db.Integer, primary_key=True)
    # id_accounts = db.Column(db.Integer, db.ForeignKey('accounts.id_accounts'), nullable=False)
    header = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    picture = db.Column(db.String(200), nullable=False)
    contact = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

