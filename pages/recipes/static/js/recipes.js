window.addEventListener('load', function() {
    createRecipeCards();
});

// Ofri - Get the slider element from the HTML using its id
var slider = document.getElementById("servingsSlider");

// Ofri - Get the output element from the HTML using its id
var output = document.getElementById("sliderValue");

// Ofri - Add an oninput event listener to the slider
slider.oninput = function () {
    // Ofri - When the slider's value changes, update the output element's text to match the slider's current value
    output.innerHTML = this.value;
}


// Ofri - The following code is responsible for the autofill of the grid using recipe cards.

const recipes = [{
    id: 1,
    name: "Simple Strawberry Cake",
    description: "A simple and tasty strawberry cake, fluffy and creamy.",
    serving: 4,
    ingredients: [
        "2 strawberries",
        "1/2 cup sugar",
        "Ingredient 3",
        "4 cups flour",
        "1/4 teaspoon salt",
        "5 teaspoons baking powder",
        "1/4 cups butter",
        "3 cups whipping cream",
        "1/4 teaspoon vanilla extract"
    ],
    image: "photos/Cake.jpeg",
    steps: [
        "Pick over and hull strawberries. Cut in half or slice, depending on size. Gently crush about a quarter of the berries with a fork to release their juices. Mix with remaining berries and the ½/2 cup of sugar, adding more sugar if necessary. Set aside, covered, for about half an hour to develop flavor.",
        "Preheat oven to 450 degrees.",
        "Into a large mixing bowl, sift together flour, 3 tablespoons sugar, salt and baking powder. Add 3 cup of softened butter, and rub into dry ingredients as for pastry. Add 1 ¼4 cups cream, and mix to a soft dough. Knead the dough for one minute on a lightly floured pastry board, then roll it out to about ½-inch thickness. Using a 3-inch biscuit cutter, cut an even number of rounds - 2 rounds per serving.",
        "Use a little of the butter to grease a baking sheet. Place half the rounds on it. Melt remaining butter and brush a little on the rounds; place remaining rounds on top. Bake for 10 to 15 minutes, or until golden brown.",
        "Beat remaining cream until it thickens. Add vanilla. Beat again just until thick."
    ],
    cuisine: "Dessert",
    sensitives: ["Gluten-Free", "Nut-Free"],
    difficulty: "Easy"},
        {
    id: 2,
    name: "Paprika Chicken With Rice",
    description: "A delicious Mediterranean dish with paprika-seasoned chicken and rice.",
    serving: 2,
    ingredients: [
        "2 chicken breasts",
        "1 cup basmati rice",
        "1 tablespoon olive oil",
        "1 teaspoon paprika",
        "1/2 teaspoon cumin",
        "1/4 teaspoon salt",
        "1/4 teaspoon pepper",
        "1 teaspoon dijon mustard",
        "1 teaspoon honey"


    ],
    image: "photos/Pap-Chicken.png",
    steps: [
        "Season chicken breasts with dijon mustard, paprika, cumin, salt, and pepper.",
        "In a large skillet, heat olive oil over medium-high heat.",
        "Add chicken breasts and cook until browned on both sides and cooked through.",
        "Remove chicken from the skillet and set aside.",
        "Add a touch of honey before serving."
    ],
    cuisine: "Mediterranean",
    sensitives: ["Dairy-Free", "Nut-Free"],
    difficulty: "Easy"
    },
    // other recipes...
];

function createRecipeCards() {
    const recipesGrid = document.querySelector('.recipes-grid');

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeCard.appendChild(recipeImage);

        const recipeName = document.createElement('h2');
        recipeName.className = 'recipe-name';
        recipeName.textContent = recipe.name;
        recipeCard.appendChild(recipeName);

        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.className = 'view-button';
        viewButton.addEventListener('click', () => {
            localStorage.setItem('recid',recipe.id);
            window.location.href = `Recepie.html`;  // navigate to new page with recipe ID in URL
        });
        recipeCard.appendChild(viewButton);

        recipesGrid.appendChild(recipeCard);
    });
}

class Recipe {
    constructor(id, name, description, serving, ingredients, image, steps, cuisine, sensitives, difficulty) {
        this.id = id || 0;
        this.name = name || "";
        this.description = description || "";
        this.serving = serving || 0;
        this.ingredients = ingredients || [];
        this.image = image || "";
        this.steps = steps || [];
        this.cuisine = cuisine || "";
        this.sensitives = sensitives || [];
        this.difficulty = difficulty || "";
    }
}