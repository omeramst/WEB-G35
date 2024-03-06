from flask import Blueprint
from flask import render_template, redirect, url_for


ingredients = Blueprint(
    'ingredients',
    __name__,
    static_folder='static',
    static_url_path='/ingredients',
    template_folder='templates'
)

@ingredients.route('/ingredients')
def home():
    return render_template('ingredients.html')
