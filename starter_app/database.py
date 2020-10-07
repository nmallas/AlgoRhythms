from dotenv import load_dotenv
from app import app, db
from app.models import User
from passlib.hash import sha256_crypt

load_dotenv()

with app.app_context():
    db.drop_all()
    db.create_all()

    demo = User(email='demo@user.io',
                hashedPassword=sha256_crypt.hash("password"))

    db.session.add(demo)

    db.session.commit()
