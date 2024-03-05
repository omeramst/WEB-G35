from flask import Flask
from flask import session

###### App setup
app = Flask(__name__)
app.config.from_pyfile('settings.py')

##session
app.secret_key = '123'
session['logged_in'] = False
session['username'] = ''

###### Pages
## Homepage
from pages.homepage.homepage import homepage

app.register_blueprint(homepage)


###### Components
## navbar
from components.navbar.navbar import navbar
app.register_blueprint(navbar)
## login
from components.login_popup.login_popup import login_popup
app.register_blueprint(login_popup)