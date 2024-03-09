
// Ofri - Get the slider element from the HTML using its id
var slider = document.getElementById("servingsSlider");

// Ofri - Get the output element from the HTML using its id
var output = document.getElementById("sliderValue");

// Ofri - Add an oninput event listener to the slider
slider.oninput = function () {
    // Ofri - When the slider's value changes, update the output element's text to match the slider's current value
    output.innerHTML = this.value;
}

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


document.querySelector('.favorite-button').addEventListener('click', async function (e) {
    e.preventDefault();
    //checks if the user is logged in
    if (loggedIn) {
        //gets the saved recipes from the user
        await fetch('api/savedrecipes', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.json()).then(data => {
            if (data.success) {
                //gets the saved recipes from the user
                console.log(data.saved);
                const saved = data.saved
                const filter = new Filter();
                filter.clearFilters();
                document.querySelectorAll('.recipe-card').forEach(card => {
                    if (saved.includes(card.dataset.id)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            } else {
                alert("there was an error getting the saved recipes, please try again later")
            }
        });
    } else {
        alert("You must be logged in to use this feature")
    }
});
