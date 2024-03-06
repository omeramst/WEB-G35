from flask import Blueprint
from flask import render_template, redirect, url_for


# singleRecipe blueprint definition
singleRecipe = Blueprint(
    'singleRecipe',
    __name__,
    static_folder='static',
    static_url_path='/singleRecipe',
    template_folder='templates'
)


# Routes
@singleRecipe.route('/Recipe')
@singleRecipe.route('/recipe')
def home():
    return render_template('singleRecipe.html')


#create a function that checks if the user is logged in
# def loginval():
#     pass