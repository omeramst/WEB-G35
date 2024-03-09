from flask import Blueprint, request, session, jsonify
from flask import render_template, redirect, url_for
from utilities.db.db_manager import DB


ingredients = Blueprint(
    'ingredients',
    __name__,
    static_folder='static',
    static_url_path='/ingredients',
    template_folder='templates'
)

@ingredients.route('/ingredients')
def load_ingredients():
    ingredients = DB.get_ingredients()
    return render_template('ingredients.html', ingredients=ingredients)




#