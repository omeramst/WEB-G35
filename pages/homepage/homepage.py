from flask import Blueprint
from flask import render_template, redirect, url_for


# homepage blueprint definition
homepage = Blueprint(
    'homepage',
    __name__,
    static_folder='static',
    static_url_path='/homepage',
    template_folder='templates'
)


# Routes
@homepage.route('/aboutus')
@homepage.route('/home')
@homepage.route('/homepage')
@homepage.route('/')
def home():
    return render_template('homepage.html')


#create a function that checks if the user is logged in
def loginval():
    pass