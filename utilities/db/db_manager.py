from flask import jsonify, session

from settings import mongoDB
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


class DBMongo:
    users = None
    cusiens = None
    sensitivities = None
    ingredients = None

    # Constructor for the DBManager class - connects to the database and sets the collections
    def __init__(self):
        # Create a new client and connect to the server
        client = MongoClient(mongoDB['uri'], server_api=ServerApi('1'))
        # get the database
        DB = client['Cookify']
        # get the collections
        self.users = DB['Users']
        self.cusiens = DB['Cuisines']
        self.sensitivities = DB['Sensitivities']
        self.ingredients = DB['Ingredients']

    """users collection functions"""

    # login
    # signup
    # user update

    # login
    def login(self, email, password):
        # check if the user exists
        user = self.users.find_one({'email': email})
        if user == None:
            return "user", False
        # check if the password is correct
        if user['password'] != password:
            return "password", False
        return 'True', True

    # signup - validate if exists
    def signupval(self, email):
        # check if the user exists
        user = self.users.find_one({'email': email.lower()})
        if user != None:
            return jsonify({'error': 'email already exist', 'success': False}), 400
        return jsonify({'success': True}), 200

    # signup
    def signup(self, email, password, cusines, sensitivities, username):
        # put the user in the database
        try:
            user = self.users.insert_one(
                {'email': email.lower(), 'password': password, 'cuisine': cusines, 'sensitivity': sensitivities,
                 'username': username})
            session['logged_in'] = True
            session['username'] = username
            return jsonify({'success': True}), 200
        except:
            return jsonify({'error': 'error in signup', 'success': False}), 400


    #get cusines
    def get_cusines(self):
        return self.cusiens.distinct('value')

    #get sensitivities
    def get_sensitivities(self):
        return self.sensitivities.distinct('value')


    # Ingredients Page
    # get all ingredients
    def get_ingredients(self):
        return self.ingredients.find()

    # get ingredients filtered by type, This can get several types at once
    def get_ingredients_by_type(self, types):
        return self.ingredients.find({'type': {'$in': types}})


# Creates an instance for the DBManager class for export.
DB = DBMongo()
