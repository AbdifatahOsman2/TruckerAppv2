from flask import Blueprint, json, jsonify, request
from peewee import DoesNotExist
from flask_login import current_user, login_required
from playhouse.shortcuts import model_to_dict
from stop import Stop
from truckerstop import TruckerStop
from user import User
stop = Blueprint('stops', __name__, url_prefix='/stops')

@stop.route('/', methods=['GET'])
def get_all_stops():
    try:
        stops = [model_to_dict(stop) for stop in Stop]
        return jsonify(stops), 200
    except DoesNotExist:
        return jsonify(message="error getting resources")

@stop.route('/new', methods=["POST"])
@login_required
def add_stop():
    body = request.get_json()
    stop = Stop.create(**body)
    return jsonify(model_to_dict(stop)), 201

@stop.route("/<int:id>", methods=["PUT"])
@login_required
def update_stop(id):
    try:
        body = request.get_json()
        Stop.update(**body).where(Stop.id == id).execute()
        stop = Stop.get_by_id(id)
        return jsonify(model_to_dict(stop))
    except DoesNotExist:
        return jsonify(message="error getting resources"), 500

@stop.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_post(id):
    try:
        Stop.delete().where(Stop.id == id).execute()
        return jsonify(message = f"Stop with the id of [{id}] successfully deleted")
    except DoesNotExist:
        return jsonify(message="error getting resources"), 500

@stop.route("/truckerstops/<int:stop_id>", methods = ["POST"])
@login_required
def add_trucker_stop(stop_id):
    try:
        stop = Stop.get_by_id(stop_id)
        if TruckerStop.get_or_none(TruckerStop.user == current_user.id, TruckerStop.stop == stop.id) != None:
            return jsonify(message= "TruckerStop already in use"), 400
        TruckerStop.create(user = current_user, stop=stop)
        user = User.get_by_id(current_user.id)
        user_dict = model_to_dict(user, backrefs=True)
        del user_dict["password"]
        return jsonify(user_dict), 201
    except DoesNotExist:
        return jsonify(message = "cannot get resources"), 500