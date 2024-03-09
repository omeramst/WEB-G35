from flask import Blueprint, render_template
from flask import session, redirect

# navbar blueprint definition
navbar = Blueprint('navbar', __name__, static_folder='static', static_url_path='/navbar', template_folder='templates')


@navbar.route('/logout')
def logout():
    session['logged_in'] = False
    session['email'] = ''
    return redirect('/')