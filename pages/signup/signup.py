from flask import Blueprint
from flask import render_template, redirect, url_for


signup = Blueprint(
    'signup',
    __name__,
    static_folder='static',
    static_url_path='/signup',
    template_folder='templates'
)

@signup.route('/signup')
def signup_page():
    return render_template('signup.html')

