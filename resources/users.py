import re
from flask import request, jsonify, Blueprint
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_login import login_user, current_user, logout_user, login_required
from peewee import DoesNotExist
from playhouse.shortcuts import model_to_dict

from user import User

user = Blueprint('user', __name__, url_prefix='/user')

@user.route('/register', methods=["POST"])
def register():
    body = request.get_json()
    body['email'] = body['email'].lower()
    try:
        user = User.get(User.email == body['email'])
        return jsonify(message="A user with that email already exists"), 401
    except DoesNotExist:
        body['password'] = generate_password_hash(body['password'])
        user = User.create(**body)
        login_user(user)
        user_to_dict = model_to_dict(user)
        del user_to_dict['password']
        return jsonify(user_to_dict), 201

@user.route('/login', methods=["POST"])
def login():
    body = request.get_json()
    try:
        user = User.get(User.username == body['username'])
        user_dict = model_to_dict(user)

        if (check_password_hash(user_dict['password'], body['password'])):
            login_user(user)
            del user_dict['password']
            
            return jsonify(user_dict), 201
        else:
            return jsonify(message="password or username is incorrect"), 401
    except DoesNotExist:
        return jsonify(message="password or username is incorrect"), 401

        
@user.route('/logout', methods=["GET"])
@login_required
def logout():
    logout_user()
    return jsonify(message="Successful logout.")
