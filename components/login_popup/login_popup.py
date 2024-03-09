from flask import Blueprint, render_template, request, session, redirect, jsonify
from utilities.db.db_manager import DB
# navbar blueprint definition
login_popup = Blueprint('login_popup', __name__, static_folder='static', static_url_path='/login_popup', template_folder='templates')


@login_popup.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing email or password', 'success': False}), 400
    email = data['email'].lower()
    password = data['password']
    # ... authenticate user ...
    message , val = DB.login(email, password)
    if val == False:
        if message == "user":
            return jsonify({'error': 'User does not exist', 'success': False}), 400
        else:
            return jsonify({'error': 'Incorrect password', 'success': False}), 400
    session['logged_in'] = True
    session['email'] = email
    return jsonify({'success': True}), 200

@login_popup.route('/login')
def is_logged_in():
    return jsonify({'logged_in': session['logged_in']})

