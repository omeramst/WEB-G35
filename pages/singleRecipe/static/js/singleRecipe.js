//should be from db
const recipe = [{
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
    difficulty: "Easy"
},
    {
        id: 2,
        name: "Paprika Chicken With Rice",
        description: "A delicious Mediterranean dish with paprika-seasoned chicken and rice.",
        serving: 2,
        ingredients: [
            "2 chicken breasts",
            "1 cup rice",
            "1 tablespoon olive oil",
            "1 onion, diced",
            "2 cloves garlic, minced",
            "1 red bell pepper, chopped",
            "1 teaspoon paprika",
            "1/2 teaspoon cumin",
            "Salt and pepper to taste",
            "Fresh parsley for garnish"
        ],
        image: "photos/Pap-Chicken.png",
        steps: [
            "Season chicken breasts with paprika, cumin, salt, and pepper.",
            "In a large skillet, heat olive oil over medium-high heat.",
            "Add chicken breasts and cook until browned on both sides and cooked through.",
            "Remove chicken from the skillet and set aside.",
            "In the same skillet, add diced onion, minced garlic, and chopped red bell pepper. Sauté until vegetables are tender.",
            "Add rice to the skillet and cook, stirring, for a couple of minutes.",
            "Return the cooked chicken to the skillet and mix with the rice and vegetables.",
            "Garnish with fresh parsley before serving."
        ],
        cuisine: "Mediterranean",
        sensitives: ["Dairy-Free", "Nut-Free"],
        difficulty: "Easy"
    },
    // other recipes...
];
//consts and event listeners
const loginBtn = document.getElementById("login");
const logoutBtn = document.getElementById("logout");
const signupBtn = document.getElementById("signup");
const cookifyBtn = document.getElementById("imagelogo");
const aboutBtn = document.getElementById("aboutus");
const userinfobtn = document.getElementById("userinfo");
const recipes = document.getElementById("recipes");
const ingredients = document.getElementById("ingredients");
const user = JSON.parse(localStorage.getItem('user'));
const favorite = document.getElementById('FavoriteButton')
//const urlParams = new URLSearchParams(window.location.search); didnt learned yet
const recipeId = localStorage.getItem('recid');
const selectedRecipe = recipe.find((r) => r.id === parseInt(recipeId));

//on load
window.onload = function () {
    //check if user is logged in
    const logoutbutn = document.getElementById("logout");
    const userinfobtn = document.getElementById("userinfo");
    const loginbutn = document.getElementById("login");
    const signupbutn = document.getElementById("signup");
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        loginbutn.style.display = "none";
        signupbutn.style.display = "none";
        logoutbutn.style.display = "block";
        userinfobtn.style.display = "block";
    } else {
        loginbutn.style.display = "block";
        signupbutn.style.display = "block";
        logoutbutn.style.display = "none";
        userinfobtn.style.display = "none";
    }
    fillRecipeTemplate(selectedRecipe);
    //
};


function fillRecipeTemplate(recipe) {
    // Set values for various elements in the HTML template
    document.getElementById("RecepieHeader").innerText = recipe.name;
    document.getElementById("RecepieDescription").innerText = recipe.description;
    document.getElementById("RecepieServing").innerHTML = "<strong>Serving:</strong> " + recipe.serving;
    document.getElementById("RecepieImage").src = recipe.image;

    // Populate the Ingredients list
    const ingredientsList = document.getElementById("RecepieIngredients");
    ingredientsList.innerHTML = "";
    recipe.ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.classList.add("infoContainer")
        li.innerText = ingredient;
        ingredientsList.appendChild(li);
    });

    // Additional code to populate other elements as needed
    const stepsContainer = document.getElementById("recipeSteps");
    stepsContainer.innerHTML = "";
    for (let i = 0; i < recipe.steps.length; i++) {
        const stepNumber = i + 1;
        const stepId = "step" + stepNumber;
        const stepDescriptionId = "step" + stepNumber + "Description";

        const stepDiv = document.createElement("div");
        stepDiv.classList.add("RecipieStep");

        const h2 = document.createElement("h2");
        h2.innerText = "Step " + stepNumber;
        h2.classList.add("RecipieStep");
        stepDiv.appendChild(h2);

        const p = document.createElement("p");
        p.innerText = recipe.steps[i];
        p.classList.add("RecipieStep");
        stepDiv.appendChild(p);

        stepsContainer.appendChild(stepDiv);
    }
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
class User {
    constructor(username, password, email, cuisine, sensitive, saved) {
        this.username = username || '';
        this.password = password || '';
        this.email = email || '';
        this.cuisine = cuisine || [];
        this.sensitive = sensitive || [];
        this.saved = saved || [];
    }
}
