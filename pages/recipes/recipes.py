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
    sensitivities = DB.get_sensitivities()
    cuisines = DB.get_cusines()
    if session['logged_in']:
        usercusine = DB.get_logged_user()['cuisine']
        usersensitivity = DB.get_logged_user()['sensitivity']
        return render_template('recipes.html', recipes=recipes, sensitivities=sensitivities, cuisines=cuisines, usercusine=usercusine, usersensitivity=usersensitivity)
    return render_template('recipes.html', recipes=recipes, sensitivities=sensitivities, cuisines=cuisines, usercusine=[], usersensitivity=[])

@recipes.route('/api/savedrecipes', methods=['GET'])
def saved_recipes():
    try:
        saved = DB.get_logged_user()['saved']
        return jsonify({'saved': saved, 'success': True}), 200
    except:
        return jsonify({'error': 'error in getting saved recipes', 'success': False}), 400

@recipes.route('/api/userpreferences')
def user_preferences():
    try:
        user = DB.get_logged_user()
        return jsonify({'cuisine': user['cuisine'], 'sensitivity': user['sensitivity'], 'success': True}), 200
    except:
        return jsonify({'error': 'error in getting user preferences', 'success': False}), 400
