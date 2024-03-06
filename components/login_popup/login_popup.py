from flask import Blueprint, render_template, request, session, redirect, jsonify

# navbar blueprint definition
login_popup = Blueprint('login_popup', __name__, static_folder='static', static_url_path='/login_popup', template_folder='templates')


@login_popup.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing email or password', 'success': False}), 400
    email = data['email']
    password = data['password']
    # ... authenticate user ...
    if user_authenticated(email, password):  # if the user is authenticated
        return jsonify({'message': 'Login successful', 'success': True}), 200
    else:
        return jsonify({'error': 'Invalid email or password', 'success': False}), 401

def user_authenticated(email, password):
    return True  # for now, just return True