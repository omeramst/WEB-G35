from flask import Blueprint, render_template, request, session, redirect

# navbar blueprint definition
login_popup = Blueprint('login_popup', __name__, static_folder='static', static_url_path='/login_popup', template_folder='templates')


@login_popup.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    # checking in db instead
    if username == 'admin' and password == 'password':
        session['logged_in'] = True
        session['username'] = username
        return True  # redirect back to the page they were on
    else:
        return False
