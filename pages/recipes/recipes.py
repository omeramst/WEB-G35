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
        return render_template('recipes.html', recipes=recipes, sensitivities=sensitivities, cuisines=cuisines, usercusine=usercusine, usersensitivity=usersensitivity, no_recipes_found=False)
    return render_template('recipes.html', recipes=recipes, sensitivities=sensitivities, cuisines=cuisines, usercusine=[], usersensitivity=[], no_recipes_found=False)

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


# This is the code that is used to get the suitable recipes and render the recipes.html page with the suitable recipes
@recipes.route('/showSuitableRecipes', methods=['GET'])
def show_suitable_recipes():
    selected_ingredients = session.get('selected_ingredients')
    print(f"Received selected ingredients: {selected_ingredients}")  # Print the received ingredients
    suitable_recipes = DB.get_suitable_recipes(selected_ingredients)
    print(f"Returning suitable recipes: {suitable_recipes}")  # Print the suitable recipes

    # Check if there are any suitable recipes
    if suitable_recipes:
        # If there are suitable recipes, render the recipes.html template with the suitable recipes
        return render_template('recipes.html', recipes=suitable_recipes, no_recipes_found=False)
    else:
        # If there are no suitable recipes, render the recipes.html template with no_recipes_found set to True
        return render_template('recipes.html', recipes=[], no_recipes_found=True)


# This is the code that is used to store the selected ingredients in the session
@recipes.route('/storeSelectedIngredients', methods=['POST'])
def store_selected_ingredients():
    selected_ingredients = request.json
    session['selected_ingredients'] = selected_ingredients
    return '', 204