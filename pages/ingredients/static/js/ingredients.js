
// Create an empty array to store the chosen ingredients
let SelectedIng = [];

// Always include sugar, salt and pepper
SelectedIng.push('Salt');
SelectedIng.push('Ground Black Pepper');
SelectedIng.push('Sugar');





let ingredientGrid = document.querySelector('.ingredient-grid');
let chosenIngredients = JSON.parse(ingredientGrid.dataset.chosenIngredients);
console.log('Chosen Ingredients:', chosenIngredients); // Debug line


// This class will handle the button clicks for each ingredient
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


// This event listener is attached to the "Clear All" button that will clear the search input field and show ingredients
document.getElementById('clear-all').addEventListener('click', function() {
    // Clear the search input field
    document.querySelector('.search-input').value = '';

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

// Add an event listener for the 'keydown' event on the search input field
document.querySelector('.search-input').addEventListener('keydown', function(event) {
    // If the key pressed is 'Enter', trigger the click event on the search button
    if (event.keyCode === 13) {
        event.preventDefault();
        document.querySelector('.search-button').click();
    }
});






