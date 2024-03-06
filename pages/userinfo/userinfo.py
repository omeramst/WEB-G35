from flask import Blueprint
from flask import render_template, redirect, url_for


userinfo = Blueprint(
    'userinfo',
    __name__,
    static_folder='static',
    static_url_path='/userinfo',
    template_folder='templates'
)

@userinfo.route('/userinfo')
def signup_page():
    return render_template('userinfo.html')

