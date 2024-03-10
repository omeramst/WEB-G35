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

// Get all 'Add' buttons
let buttons = document.querySelectorAll('.IngAddButton');


// Console Validation of the array

// Add event listener to each add button
buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Get the ingredient name from the sibling h3 element
        let ingredientName = this.previousElementSibling.textContent;

        if (this.style.backgroundColor === 'rgb(98, 205, 20)') { // If already green cause was clicked before
            this.style.backgroundColor = '#6D31EDFF'; // Change back to purple
            this.textContent = 'Add'; // Change text back to 'Add'
            const index = SelectedIng.indexOf(ingredientName); // Find the index of the ingredient in the array
            if (index > -1) {
                SelectedIng.splice(index, 1); // Remove the ingredient from the array
            }
        } else { // If not green cause was not clicked before
            this.style.backgroundColor = 'rgb(98, 205, 20)'; // Change to green
            this.textContent = 'Remove'; // Change text to 'Remove'
            SelectedIng.push(ingredientName); // Add the ingredient to the array
        }
        console.log(SelectedIng);
    });
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


