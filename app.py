from flask import Flask
from flask import session, request

###### App setup
app = Flask(__name__)
app.config.from_pyfile('settings.py')

##session
app.secret_key = '123'
# Set up session defaults
@app.before_request
def set_default_session():
    if 'logged_in' not in session:
        session['logged_in'] = False
    if 'email' not in session:
        session['email'] = ''

###### Pages
## Homepage
from pages.homepage.homepage import homepage
app.register_blueprint(homepage)

## Ingredients
from pages.ingredients.ingredients import ingredients
app.register_blueprint(ingredients)

##signup
from pages.signup.signup import signup
app.register_blueprint(signup)

##userinfo
from pages.userinfo.userinfo import userinfo
app.register_blueprint(userinfo)

##recipes
from pages.recipes.recipes import recipes
app.register_blueprint(recipes)

##singleRecipe
from pages.singleRecipe.singleRecipe import singleRecipe
app.register_blueprint(singleRecipe)

###### Components
## navbar
from components.navbar.navbar import navbar
app.register_blueprint(navbar)
## login
from components.login_popup.login_popup import login_popup
app.register_blueprint(login_popup)

