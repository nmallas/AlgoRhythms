from flask import Blueprint, jsonify, session, request
from app.models import User
from passlib.hash import sha256_crypt
from app import db

user_routes = Blueprint('users', __name__)


@user_routes.route('/', methods=["POST"])
def createUser():
    data = request.json
    print(data)
    if(data["password"] != data["confirmPassword"]):
        return {"error": "Passwords Must Match!"}
    newUser = User(
                email=data["email"],
                hashedPassword=sha256_crypt.hash(data["password"]))
    db.session.add(newUser)
    db.session.commit()
    user = User.query.filter(User.email == data["email"]).first()
    if user:
        session["userId"] = user.id
    print({"login": user.to_dict()})
    return {"login": user.to_dict()}


@user_routes.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter(User.email == data["email"]).first()

    if user:
        session["userId"]=user.id
        auth = sha256_crypt.verify(data["password"], str(user.hashedPassword))
        if not auth:
            return {"error": "Incorrect Email or Password"}
    print(user.to_dict())
    return {"login": user.to_dict()}
