from flask import Blueprint
from flask import render_template, redirect, url_for


recipes = Blueprint(
    'recipes',
    __name__,
    static_folder='static',
    static_url_path='/recipes',
    template_folder='templates'
)

@recipes.route('/recipes')
def home():
    return render_template('recipes.html')
