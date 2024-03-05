from flask import Blueprint, render_template

# navbar blueprint definition
login_popup = Blueprint('login_popup', __name__, static_folder='static', static_url_path='/login_popup', template_folder='templates')
