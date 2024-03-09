// window.addEventListener('load', function() {
//     createRecipeCards();
// });

// Ofri - The following code is responsible for the autofill of the grid using recipe cards.
//
// const recipes = [{
//     id: 1,
//     name: "Simple Strawberry Cake",
//     description: "A simple and tasty strawberry cake, fluffy and creamy.",
//     serving: 4,
//     ingredients: [
//         "Strawberry - 2 ",
//         "Sugar - 1/2 cup ",
//         "Flour - 4 cups ",
//         "Salt - 1/4 teaspoon ",
//         "Baking Powder 5 teaspoons ",
//         "Butter - 1/4 cups ",
//         "Whipped Cream - 3 cups",
//         "Vanilla - 1/4 extract teaspoon"
//     ],
//     image: "Cake.jpeg",
//     steps: [
//         "Pick over and hull strawberries. Cut in half or slice, depending on size. Gently crush about a quarter of the berries with a fork to release their juices. Mix with remaining berries and the ½/2 cup of sugar, adding more sugar if necessary. Set aside, covered, for about half an hour to develop flavor.",
//         "Preheat oven to 450 degrees.",
//         "Into a large mixing bowl, sift together flour, 3 tablespoons sugar, salt and baking powder. Add 3 cup of softened butter, and rub into dry ingredients as for pastry. Add 1 ¼4 cups cream, and mix to a soft dough. Knead the dough for one minute on a lightly floured pastry board, then roll it out to about ½-inch thickness. Using a 3-inch biscuit cutter, cut an even number of rounds - 2 rounds per serving.",
//         "Use a little of the butter to grease a baking sheet. Place half the rounds on it. Melt remaining butter and brush a little on the rounds; place remaining rounds on top. Bake for 10 to 15 minutes, or until golden brown.",
//         "Beat remaining cream until it thickens. Add vanilla. Beat again just until thick."
//     ],
//     cuisine: "Dessert",
//     sensitives: ["Dairy", "Gluten"],
//     difficulty: "Hard"},
//         {
//     id: 2,
//     name: "Paprika Chicken With Rice",
//     description: "A delicious Mediterranean dish with paprika-seasoned chicken and rice.",
//     serving: 2,
//     ingredients: [
//         "Chicken Breast - 2",
//         "Basmati Rice - 1 cup",
//         "Olive Oil - 1 tablespoon",
//         "Sweet Paprika - 1 teaspoon",
//         "Ground Cumin - 1/2 teaspoon",
//         "Salt - 1/4 teaspoon ",
//         "Ground Black Pepper - 1/4 teaspoon",
//         "Dijon Mustard - 1 teaspoon",
//         "Honey - 1 teaspoon"
//
//
//     ],
//     image: "Pap-Chicken.png",
//     steps: [
//         "Season chicken breasts with dijon mustard, paprika, cumin, salt, and pepper.",
//         "In a large skillet, heat olive oil over medium-high heat.",
//         "Add chicken breasts and cook until browned on both sides and cooked through.",
//         "Remove chicken from the skillet and set aside.",
//         "Add a touch of honey before serving."
//     ],
//     cuisine: "Mediterranean",
//     sensitives: ["Meat"],
//     difficulty: "Easy"
//     },
//     // other recipes...
// ];

// function createRecipeCards() {
//     const recipesGrid = document.querySelector('.recipes-grid');
//
//     recipes.forEach(recipe => {
//         const recipeCard = document.createElement('div');
//         recipeCard.className = 'recipe-card';
//
//         const recipeImage = document.createElement('img');
//         recipeImage.src = recipe.image;
//         recipeCard.appendChild(recipeImage);
//
//         const recipeName = document.createElement('h2');
//         recipeName.className = 'recipe-name';
//         recipeName.textContent = recipe.name;
//         recipeCard.appendChild(recipeName);
//
//         const viewButton = document.createElement('button');
//         viewButton.textContent = 'View';
//         viewButton.className = 'view-button';
//         viewButton.addEventListener('click', () => {
//             localStorage.setItem('recid',recipe.id);
//             window.location.href = `Recepie.html`;  // navigate to new page with recipe ID in URL
//         });
//         recipeCard.appendChild(viewButton);
//
//         recipesGrid.appendChild(recipeCard);
//     });
// }
//
// class Recipe {
//     constructor(id, name, description, serving, ingredients, image, steps, cuisine, sensitives, difficulty) {
//         this.id = id || 0;
//         this.name = name || "";
//         this.description = description || "";
//         this.serving = serving || 0;
//         this.ingredients = ingredients || [];
//         this.image = image || "";
//         this.steps = steps || [];
//         this.cuisine = cuisine || "";
//         this.sensitives = sensitives || [];
//         this.difficulty = difficulty || "";
//     }
// }

// Ofri - Get the slider element from the HTML using its id
var slider = document.getElementById("servingsSlider");

// Ofri - Get the output element from the HTML using its id
var output = document.getElementById("sliderValue");

// Ofri - Add an oninput event listener to the slider
slider.oninput = function () {
    // Ofri - When the slider's value changes, update the output element's text to match the slider's current value
    output.innerHTML = this.value;
}

// The filters part:

// document.querySelector('.filter-apply-button:not(.favorite-button)').addEventListener('click', function() {
//     // Collect all checked checkboxes
//     let checkedDifficulties = Array.from(document.querySelectorAll('input[name="Difficulty"]:checked')).map(input => input.value);
//     let checkedCuisines = Array.from(document.querySelectorAll('input[name="Cuisine"]:checked')).map(input => input.value);
//     let checkedSensitivities = Array.from(document.querySelectorAll('input[name="Sensitivity"]:checked')).map(input => input.value);
//
//     // Get the value of the slider
//     let servingsValue = document.querySelector('#servingsSlider').value;
//
//     // Loop through all recipe cards
//     document.querySelectorAll('.recipe-card').forEach(card => {
//         // Get the data attributes of the card
//         let cardDifficulty = card.dataset.difficulty;
//         let cardCuisine = card.dataset.cuisine;
//         let cardSensitivities = card.dataset.sensitives.split(', ');
//         let cardServings = card.dataset.serving;
//
//         // Check if the card matches the user's choices
//         if (checkedDifficulties.includes(cardDifficulty) &&
//             checkedCuisines.includes(cardCuisine) &&
//             !cardSensitivities.some(sensitivity => checkedSensitivities.includes(sensitivity)) &&
//             parseInt(cardServings) >= parseInt(servingsValue)) {
//             // If it does, display the card
//             card.style.display = 'block';
//         } else {
//             // If it doesn't, hide the card
//             card.style.display = 'none';
//         }
//     });
// });

class Filter {
    constructor() {
        // Initialize the properties for the checked difficulties, cuisines, sensitivities, and servings value
        this.checkedDifficulties = [];
        this.checkedCuisines = [];
        this.checkedSensitivities = [];
        this.servingsValue = 0;
    }


    // Collects all checked checkboxes and the value of the slider
    collectFilters() {
        this.checkedDifficulties = Array.from(document.querySelectorAll('input[name="Difficulty"]:checked')).map(input => input.value);
        this.checkedCuisines = Array.from(document.querySelectorAll('input[name="Cuisine"]:checked')).map(input => input.value);
        this.checkedSensitivities = Array.from(document.querySelectorAll('input[name="Sensitivity"]:checked')).map(input => input.value);
        this.servingsValue = document.querySelector('#servingsSlider').value;
    }

    // Gets the data attributes of the card and checks if the card matches the user's choices
    matchesFilters(card) {
        let cardDifficulty = card.dataset.difficulty;
        let cardCuisine = card.dataset.cuisine;
        let cardSensitivities = card.dataset.sensitives.split(', ');
        let cardServings = card.dataset.serving;


        return (this.checkedDifficulties.length === 0 || this.checkedDifficulties.includes(cardDifficulty)) &&
            (this.checkedCuisines.length === 0 || this.checkedCuisines.includes(cardCuisine)) &&
            !cardSensitivities.some(sensitivity => this.checkedSensitivities.includes(sensitivity)) &&
            parseInt(cardServings) >= parseInt(this.servingsValue);
    }

    // Loops through all recipe cards and displays the user's choices. Hides cards that don't qualify
    applyFilters() {
        document.querySelectorAll('.recipe-card').forEach(card => {
            // If the card matches the user's choices, display the card
            if (this.matchesFilters(card)) {
                card.style.display = 'block';
            } else {
                // If the card doesn't match the user's choices, hide the card
                card.style.display = 'none';
            }
        });
    }

    clearFilters() {
        // Uncheck all checkboxes
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });

        // Reset the slider to its default value
        let slider = document.querySelector('#servingsSlider');
        slider.value = slider.defaultValue;
        document.querySelector('#sliderValue').textContent = slider.defaultValue;

        // Display all recipe cards
        document.querySelectorAll('.recipe-card').forEach(card => {
            card.style.display = 'block';
        });
    }
}


// When the "Apply" button is clicked, create a new instance of the Filter class, collect the user's choices, and apply these choices to the recipe cards
document.querySelector('.filter-apply-button:not(.favorite-button)').addEventListener('click', function() {
    let filter = new Filter();
    filter.collectFilters();
    filter.applyFilters();
});

// When the "Clear" button is clicked, create a new instance of the Filter class and clear the user's choices
document.querySelector('#clear-filter').addEventListener('click', function() {
    let filter = new Filter();
    filter.clearFilters();
});

