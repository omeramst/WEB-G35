from flask import Blueprint , request, session
from flask import render_template, redirect, url_for
from utilities.db.db_manager import DB


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
    id = request.args.get('id', default = '0', type = int)
    r = DB.get_recipe_by_id(id)
    name = r['name']
    description = r['description']
    ingredients = r['ingredients']
    servings = r['serving']
    image = r['image']
    difficulty = r['difficulty']
    steps = r['steps']
    #check if the user is logged in and if the recipe is saved
    if session['logged_in'] == False:
        return render_template('singleRecipe.html', name=name, description=description, ingredients=ingredients, servings=servings, image=image, difficulty=difficulty, steps=steps, saved=False)
    saved = DB.get_logged_user()['saved']
    exists = str(id) in saved
    return render_template('singleRecipe.html', name=name, description=description, ingredients=ingredients, servings=servings, image=image, difficulty=difficulty, steps=steps, saved=exists)


@singleRecipe.route('/recipe', methods=['POST'])
def saverecepie():
    data = request.get_json()
    id = data['recipeID']
    return DB.save_recipe(id)