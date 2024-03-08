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

# @ingredients.route('/ingredients', methods=['POST'])
# def filter_ingredients():
#     categories = request.form.getlist('categories')
#     ingredients = DB.get_ingredients_by_type(categories)
#     return render_template('ingredients.html', ingredients=ingredients)


# @ingredients.route('/ingredients', methods=['POST'])
# def filter_ingredients():
#     categories = request.form.getlist('categories')
#     ingredients = DB.get_ingredients_by_type(categories)
#     return jsonify(ingredients=[i.serialize() for i in ingredients])

@ingredients.route('/ingredients', methods=['POST'])
def filter_ingredients():
    try:
        categories = request.get_json().get('categories', [])
        print(f"Categories: {categories}")  # Debug print statement
        ingredients_cursor = DB.get_ingredients_by_type(categories)
        ingredients = list(ingredients_cursor)  # Convert cursor to list
        print(f"Ingredients: {ingredients}")  # Debug print statement
        return jsonify(ingredients=[i.serialize() for i in ingredients])
    except Exception as e:
        return jsonify(error=str(e)), 500