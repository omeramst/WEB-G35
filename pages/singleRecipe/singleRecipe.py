from flask import Blueprint , request
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
    print(r)
    return render_template('singleRecipe.html' )


