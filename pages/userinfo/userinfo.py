from flask import Blueprint , request
from flask import render_template, redirect, url_for
from utilities.db.db_manager import DB

userinfo = Blueprint(
    'userinfo',
    __name__,
    static_folder='static',
    static_url_path='/userinfo',
    template_folder='templates'
)

@userinfo.route('/userinfo')
def signup_page():
    user = DB.get_logged_user()
    cuisine = user['cuisine']
    sensitivity = user['sensitivity']
    username = user['username']
    email = user['email']
    password = user['password']
    allsensitivities = DB.get_sensitivities()
    allcuisines = DB.get_cusines()
    return render_template('userinfo.html', cuisine=cuisine, sensitivity=sensitivity, username=username, email=email, password=password, allsensitivities=allsensitivities, allcuisines=allcuisines)

@userinfo.route('/userinfo' , methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    password = data['password']
    cusines = data['cuisine']
    sensitivities = data['sensitive']
    username = data['username']
    return DB.userupdate(email, password, cusines, sensitivities, username)