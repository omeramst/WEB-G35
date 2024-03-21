// const ingredients = [
//     // Fix the path of the images, all are in the same folder. For example, the Kiwi path is `pages/ingredients/static/media/photos/Kiwi.png`
//
//
//     { name: "Kiwi", image: `...media/photos/Kiwi.png`, type: "Fruits" },
//     { name: "Salmon", image: "photos/salmon.jpeg", type: "Fish" },
//     { name: "Basmati Rice", image: "photos/basmati_rice.jpeg", type: "Pantry Essentials"},
//     { name: "Carrot", image: "photos/carrot.jpeg", type: "Vegetables" },
//     { name: "Butter", image: "photos/butter.jpeg", type: "Dairy & Eggs" },
//     { name: "Dijon Mustard", image: "photos/dijon_mustard.jpeg", type: "Pantry Essentials" },
//     { name: "Lettuce", image: "photos/Lettuce.jpeg", type: "Vegetables" },
//     { name: "Chicken Breast", image: "photos/chicken_breast_new.jpeg", type: "Meat" },
//     { name: "Green Apple", image: "photos/Green_Apple.png", type: "Fruits" },
//     { name: "Flour", image: "photos/flour_new.jpeg", type: "Pantry Essentials" },
//     { name: "Vanilla", image: "photos/vanilla-1.png", type: "Pantry Essentials" },
//     { name: "Whipped Cream", image: "photos/whipped cream.jpeg", type: "Dairy & Eggs" },
//     { name: "Ground Cumin" , image: "photos/ground_cumin.jpeg", type: "Spices" },
//     { name: "Sweet Paprika", image: "photos/sweet_paprika.jpg", type: "Spices" },
//     { name: "Olive Oil", image: "photos/olive_oil.jpeg", type: "Pantry Essentials" },
//     { name: "Honey", image: "photos/Honey.jpeg", type: "Pantry Essentials" },
//     { name: "Chicken Egg", image: "photos/chick_egg_final.jpeg", type: "Dairy & Eggs" },
//     { name: "Strawberry", image: "photos/strawberry_new.jpeg", type: "Fruits" },
//     { name: "Baking Powder", image: "photos/backing powder.jpeg", type: "Pantry Essentials" },
//     { name: "Parmesan Cheese", image: "photos/parmesan_good.jpeg", type: "Dairy & Eggs" },
//
//
//
//
// ];
//
// const ingredientGrid = document.querySelector('.ingredient-grid');
//
// ingredients.forEach(ingredient => {
//     const ingredientCard = document.createElement('div');
//     ingredientCard.classList.add('ingredient-card');
//     ingredientCard.dataset.type = ingredient.type;
//
//     const ingredientImage = document.createElement('img');
//     ingredientImage.src = ingredient.image;
//     ingredientImage.alt = ingredient.name;
//
//     const ingredientName = document.createElement('h3');
//     ingredientName.textContent = ingredient.name;
//     ingredientName.classList.add('ingredient-name'); // Ofri - Added this line to make the name of the ingredient centered.
//
//     const applyButton = document.createElement('button');
//     applyButton.textContent = 'Add';
//     applyButton.classList.add('IngAddButton');
//     // Ofri - This event listener will help us later when we will do backend and Add the ingredients to the user's List.
//     applyButton.addEventListener('click', () => {
//     if (applyButton.style.backgroundColor === 'rgb(98, 205, 20)') { // //Ofri - IF already green cause was clicked before
//         applyButton.style.backgroundColor = '#6D31EDFF';
//     } else { //Ofri - If not green cause was not clicked before
//         applyButton.style.// Create an empty array to store the chosen ingredients

//     }
// });
//
//     ingredientCard.append(ingredientImage, ingredientName, applyButton);
//     ingredientGrid.append(ingredientCard);
// });

// Create an empty array to store the chosen ingredients
let SelectedIng = [];

// Always include salt and pepper
SelectedIng.push('Salt');
SelectedIng.push('Ground Black Pepper');
SelectedIng.push('Sugar');


// This is the part that checks the chosen ingredients in the session and stylizes them as chosen

// Get the chosen ingredients from the session
////
// let saved_Ingredients = {{ chosen_Ingredients|tojson|safe }};
// console.log('Saved Ingredients:', saved_Ingredients); // Debuginh Check
// // Get all ingredient cards
// let ingredientCards = document.querySelectorAll('.ingredient-card');
//
// // Loop through all ingredient cards
// ingredientCards.forEach(card => {
//     // Get the ingredient name from the h3 element
//     let ingredientName = card.querySelector('.ingredient-name').textContent;
//
//     // Check if the ingredient name is in the saved_Ingredients array
//     if (saved_Ingredients.includes(ingredientName)) {
//         // Get the 'Add' button
//         let button = card.querySelector('.IngAddButton');
//
//         // Change the button's style and text content
//         button.style.backgroundColor = 'rgb(98, 205, 20)'; // Change to green
//         button.textContent = 'Remove'; // Change text to 'Remove'
//
//         // Add the ingredient name to the SelectedIng array
//         SelectedIng.push(ingredientName);
//     }
// });



let ingredientGrid = document.querySelector('.ingredient-grid');
let chosenIngredients = JSON.parse(ingredientGrid.dataset.chosenIngredients);
console.log('Chosen Ingredients:', chosenIngredients); // Debug line

//
// // Get all 'Add' buttons
// let buttons = document.querySelectorAll('.IngAddButton');
//
//
// // Console Validation of the array
//
// // Add event listener to each add button
// buttons.forEach(button => {
//     button.addEventListener('click', function() {
//         // Get the ingredient name from the sibling h3 element
//         let ingredientName = this.previousElementSibling.textContent;
//
//         if (this.style.backgroundColor === 'rgb(98, 205, 20)') { // If already green cause was clicked before
//             this.style.backgroundColor = '#6D31EDFF'; // Change back to purple
//             this.textContent = 'Add'; // Change text back to 'Add'
//             const index = SelectedIng.indexOf(ingredientName); // Find the index of the ingredient in the array
//             if (index > -1) {
//                 SelectedIng.splice(index, 1); // Remove the ingredient from the array
//             }
//         } else { // If not green cause was not clicked before
//             this.style.backgroundColor = 'rgb(98, 205, 20)'; // Change to green
//             this.textContent = 'Remove'; // Change text to 'Remove'
//             SelectedIng.push(ingredientName); // Add the ingredient to the array
//         }
//         console.log(SelectedIng);
//     });
// });

class IngredientButton {
    constructor(button, ingredientName, chosenIngredients, selectedIng) {
        this.button = button;
        this.ingredientName = ingredientName;
        this.chosenIngredients = chosenIngredients;
        this.selectedIng = selectedIng;
        this.checkIfChosen(); // Check if the ingredient was chosen and saved in the session before

        this.button.addEventListener('click', () => this.handleClick());

    }

    clearChoice() {
        this.button.textContent = 'Add';
        this.button.style.backgroundColor = '#6D31EDFF';
        this.button.classList.remove('added');
        const index = this.selectedIng.indexOf(this.ingredientName);
        if (index > -1) {
            this.selectedIng.splice(index, 1);
        }
    }

    checkIfChosen() {
        if (this.chosenIngredients.includes(this.ingredientName)) {
            this.chosenBefore();
        }
    }

    chosenBefore() {
        this.button.style.backgroundColor = 'rgb(98, 205, 20)'; // Change to green
        this.removeFromChosenIngredients();
        this.button.style.backgroundColor = 'rgb(98, 205, 20)'; // Change to green
        this.button.textContent = 'Remove'; // Change text to 'Remove'
        this.selectedIng.push(this.ingredientName);
        console.log()
    }

    handleClick() {
        if (this.button.style.backgroundColor === 'rgb(98, 205, 20)') { // If already green cause was clicked before
            this.userRemove();
        } else { // If not green cause was not clicked before
            this.userAdd();
        }
        console.log(this.selectedIng);
    }

    userAdd() {
        this.button.style.backgroundColor = 'rgb(98, 205, 20)';
        this.button.textContent = 'Remove';
        this.selectedIng.push(this.ingredientName); // Add the ingredient to the array
    }



    userRemove() {
        this.button.style.backgroundColor = '#6D31EDFF'; // Change back to purple
        this.button.textContent = 'Add'; // Change text back to 'Add'
        const index = this.selectedIng.indexOf(this.ingredientName); // Find the index of the ingredient in the array
        if (index > -1) {
            this.selectedIng.splice(index, 1); // Remove the ingredient from the array
        }
    }

    removeFromChosenIngredients() {
        const index = this.chosenIngredients.indexOf(this.ingredientName);
        if (index > -1) {
            this.chosenIngredients.splice(index, 1);
        }
    }
}

// Usage
let buttons = document.querySelectorAll('.IngAddButton');
let ingredientButtons = []; // Array to store the IngredientButton instances

buttons.forEach(button => {
    let ingredientName = button.previousElementSibling.textContent;
    let ingredientButton = new IngredientButton(button, ingredientName, chosenIngredients, SelectedIng);
    ingredientButtons.push(ingredientButton); // Store the instance in the array
});

document.getElementById('Save_Choices').addEventListener('click', function() {
    fetch('/storeSelectedIngredientsInSession', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(SelectedIng),
    })
    .then(response => {
        if (response.ok) {
            if (response.redirected) {
                window.location.href = response.url;
            } else {
                console.log('Selected ingredients saved successfully');
            }
        } else {
            console.error('Error:', response.statusText);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});


// This event listener is attached to the "Clear Choices"
// It clears choices and sends a POST to clear it from the session
document.getElementById('Clear_Choices').addEventListener('click', function() {
    // Clear the selected ingredients
    SelectedIng = [];

    // Reset the appearance of all ingredient cards
    ingredientButtons.forEach(ingredientButton => {
        ingredientButton.clearChoice();
    });

    // Clear the search input
    document.querySelector('.search-input').value = '';

    // Show all ingredient cards
    document.querySelectorAll('.ingredient-card').forEach(card => card.style.display = 'block');

    // Debug check
    console.log('Chosen Ingredients:', chosenIngredients);

    // Send a request to the server to clear the chosen ingredients from the session
    fetch('/clearSelectedIngredientsInSession', {
        method: 'POST',
    })
    .then(response => {
        if (!response.ok) {
            console.error('Error:', response.statusText);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Clear the search input and show all the ingredients again
document.getElementById('clear-all').addEventListener('click', function() {
    // Clear the search input field
    document.querySelector('.search-input').value = '';

    // Show all ingredient cards
    document.querySelectorAll('.ingredient-card').forEach(card => card.style.display = 'block');
});


// Now the filters part

document.querySelector('#category-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect all checked categories
    let checkedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(input => input.value);

    // If no categories are checked, show all ingredients
    if (checkedCategories.length === 0) {
        document.querySelectorAll('.ingredient-card').forEach(card => card.style.display = 'block');
        return;
    }

    // If there are checked categories, show only those ingredients
    document.querySelectorAll('.ingredient-card').forEach(card => {
        if (checkedCategories.includes(card.dataset.type)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });

    });


    // This is the clear filter button listener and action that will clear the filter and show all the ingredients again
    document.querySelector('#clear-filter').addEventListener('click', function() {
    // Uncheck all checkboxes
    document.querySelectorAll('input[name="category"]:checked').forEach(input => input.checked = false);

    // Show all ingredient cards
    document.querySelectorAll('.ingredient-card').forEach(card => card.style.display = 'block');
});

    // This is the search button listener and action that will search for the ingredient by the name


    document.querySelector('.search-button').addEventListener('click', function() {
         console.log('Search button clicked'); // Debug line
        // Get the search text
        let searchText = document.querySelector('.search-input').value.toLowerCase();
        console.log('Search text:', searchText); // Debug line

        // Collect all checked categories
        let checkedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(input => input.value);


        // Initialize an array to store the matching cards
        let matchingCards = [];

        // Loop through all ingredient cards
    document.querySelectorAll('.ingredient-card').forEach(card => {
        // Get the name of the ingredient
        let ingredientName = card.querySelector('.ingredient-name').textContent.toLowerCase();

        // Check if the name includes the search text and if the ingredient type is in the checked categories
        if (ingredientName.includes(searchText) && (checkedCategories.length === 0 || checkedCategories.includes(card.dataset.type))) {
            // If it does, add the card to the matchingCards array
            matchingCards.push(card);
        }
    });

        console.log('Matching cards:', matchingCards); // Debug line

        // If no cards match the search text, show a message
        if (matchingCards.length === 0) {
            alert('No ingredients found that match user input and applied filters.');
        } else {
            // If there are matching cards, display them and hide the rest
            document.querySelectorAll('.ingredient-card').forEach(card => {
                if (matchingCards.includes(card)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    });



    // The main event listener for the 'Show Recipes' button. It will send the selected ingredients to the server and redirect the user to the /showSuitableRecipes page
document.getElementById('Show_Recipes').addEventListener('click', function() {
    fetch('/storeSelectedIngredients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(SelectedIng),
    })
    .then(response => {
        if (response.ok) {
            // Redirect the user to the /showSuitableRecipes page
            window.location.href = '/showSuitableRecipes';
        } else {
            console.error('Error:', response.statusText);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});








