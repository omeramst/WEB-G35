from flask import Blueprint, request, session, jsonify
from flask import render_template, redirect, url_for
from utilities.db.db_manager import DB


recipes = Blueprint(
    'recipes',
    __name__,
    static_folder='static',
    static_url_path='/recipes',
    template_folder='templates'
)

@recipes.route('/recipes')
@recipes.route('/Recipes')
def load_recipes():
    recipes = DB.get_recipes()
    return render_template('recipes.html', recipes=recipes)
