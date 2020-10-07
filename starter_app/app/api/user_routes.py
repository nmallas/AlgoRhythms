from flask import Blueprint, jsonify, session, request
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
def index():
    response = User.query.all()
    print("user route______")
    return {"users": [user.to_dict() for user in response]}


@user_routes.route("/login", methods=["POST"])
def login():
    data = request.json
    print(data)
    user = User.query.filter(User.email == data["email"] and
                             sha256_crypt.verify(data.password,
                             User.password)).first()
    if user:
        session["userId"] = user.id
    print(user.to_dict())
    return {"login": user.to_dict()}
