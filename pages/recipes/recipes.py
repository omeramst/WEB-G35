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
def load_recipes():
    recipes = DB.get_recipes()
    return render_template('recipes.html', recipes=recipes)

@recipes.route('/api/savedrecipes', methods=['GET'])
def saved_recipes():
    try:
        saved = DB.get_logged_user()['saved']
        return jsonify({'saved': saved, 'success': True}), 200
    except:
        return jsonify({'error': 'error in getting saved recipes', 'success': False}), 400
