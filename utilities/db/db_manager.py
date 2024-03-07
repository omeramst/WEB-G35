from settings import mongoDB
import pymongo
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

class DBMongo:
    users = None

    # Constructor for the DBManager class - connects to the database and sets the collections
    def __init__(self):
        # Create a new client and connect to the server
        client = MongoClient(mongoDB['uri'], server_api=ServerApi('1'))
        # get the database
        DB = client['Cookify']
        # get the collections
        self.users = DB['Users']

    """users collection functions"""
    #login
    #signup
    #user update

    #login
    def login(self, email, password):
        # check if the user exists
        user = self.users.find_one({'email': email})
        if user == None:
            return "user" ,False
        # check if the password is correct
        if user['password'] != password:
            return "password", False
        return 'True', True



# Creates an instance for the DBManager class for export.
DB = DBMongo()







