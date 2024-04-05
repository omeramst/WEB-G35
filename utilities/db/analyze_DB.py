from utilities.db.db_manager import DB

### printing the DB object
## print all documents in the collection
#print all documents in the user collection
print("Users collection:")
for doc in DB.users.find():
    print(doc)
print()

# print all documents in the cusines collection
print("Cuisines collection:")
for doc in DB.cusiens.find():
    print(doc)
print()

# print all documents in the sensitivities collection
print("Sensitivities collection:")
for doc in DB.sensitivities.find():
    print(doc)
print()

# print all documents in the ingredients collection
print("Ingredients collection:")
for doc in DB.ingredients.find():
    print(doc)
print()

# print all documents in the recipes collection
print("Recipes collection:")
for doc in DB.recipes.find():
    print(doc)
print()

# print all documents in the ingredients_categories collection
print("Ingredients Categories collection:")
for doc in DB.ingredients_categories.find():
    print(doc)
print()