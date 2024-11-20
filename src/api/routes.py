"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_bcrypt import Bcrypt
from api.models import db, User, TokenBlockedList
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)
app = Flask(__name__)
bcrypt = Bcrypt(app)
# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

@api.route("/logout", methods=["POST"])
@jwt_required()
def user_logout():
   token_data=get_jwt_identity()
   token_blocked=TokenBlockedList(jti=token_data["jti"])
   db.session.add(token_blocked)
   db.session.commit()
   return jsonify({"msg":"Session cerrada"}), 200

@api.route('/login', methods=['POST'])
def Login_user():
    body = request.get_json()
    if body['email'] is None:
        return jsonify({"msg":"Por favor ingrese su usuario"}),400
    if body['password'] is None:
        return jsonify({"msg":"Por favor ingrese su contraseña correctamente"}), 400
    user=User.query.filter_by(email=body["email"]).first()
    validate_password=bcrypt.check_password_hash(user.password, body["password"])
    # se guarda en la bbdd
    if not validate_password:
        return jsonify({"msg":"credenciales incorrectas"}), 401
        # return jsonify({"msg": "Credenciales Incorrectas"}), 401
    token=create_access_token(identity=user.id)
    response_body={
        "token":token,
        "user":user.serialize()
    }
    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup_user():
    body = request.get_json()
    exist_user=User.query.filter_by(email=body["email"]).first()
    if exist_user:
        return jsonify({"msg": "User exist already"}), 404
    pw_hash=bcrypt.generate_password_hash(body["password"]).decode("utf-8")
    new_user=User(
        email=body["email"],
        password=pw_hash,
        is_active=True
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User created"}), 201

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200




