import requests
from flask import Blueprint, request, session
from flask import render_template, redirect, url_for
from utilities.db.db_manager import DB

signup = Blueprint(
    'signup',
    __name__,
    static_folder='static',
    static_url_path='/signup',
    template_folder='templates'
)

@signup.route('/signup')
def signup_page():
    cusines = DB.get_cusines()
    sensitivities = DB.get_sensitivities()
    return render_template('signup.html', cusines=cusines, sensitivities=sensitivities)


@signup.route('/signupval', methods=['POST'])
def signup_user_val():
    # signup user
    data= request.get_json()
    email = data['email'].lower()
    return DB.signupval(email)

@signup.route('/signup', methods=['POST'])
def signup_user():
    # signup user
    data= request.get_json()
    email = data['email'].lower()
    password = data['password']
    cusines = data['cuisine']
    sensitivities = data['sensitive']
    username = data['username']


    return DB.signup(email, password, cusines, sensitivities, username)