from flask import Blueprint, request, session
from flask import jsonify, redirect, url_for, render_template
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
    ingredients_categories = DB.get_ingredients_categories()
    chosen_ingredients = session.get('selected_ingredients', [])
    print(f"Chosen ingredients: {chosen_ingredients}")
    return render_template('ingredients.html', ingredients=ingredients, ingredients_categories=ingredients_categories,
                           chosen_ingredients=chosen_ingredients)


# Store the selected ingredients in the session and redirect to the ingredients page
@ingredients.route('/storeSelectedIngredientsInSession', methods=['POST'])
def store_selected_ingredients_in_session():
    try:
        selected_ingredients = request.json
        session['selected_ingredients'] = selected_ingredients
        return redirect(url_for('ingredients.load_ingredients'))
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Clear the selected ingredients from the session and redirect to the ingredients page
@ingredients.route('/clearSelectedIngredientsInSession', methods=['POST'])
def clear_selected_ingredients_in_session():
    try:
        session['selected_ingredients'] = []
        print("Selected ingredients cleared from session: ", session.get('selected_ingredients', []))  # print to check
        return redirect(url_for('ingredients.load_ingredients'))
    except Exception as e:
        return jsonify({'error': str(e)}), 400

