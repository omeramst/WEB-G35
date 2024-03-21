//getting the recipeID from the query parameters
const recipeID = new URLSearchParams(window.location.search).get('id');
const favorite = document.getElementById('FavoriteButton')



favorite.addEventListener('click', function () {
    if (loggedIn) {
        // Add or remove the recipe from the user's saved recipes via post request
        favorite.classList.toggle('checked');
        fetch('recipe', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({recipeID: recipeID})
        }).then(response => response.json()).then(data => {
            if(data.success==false) {
                alert('we are sorry, something went wrong, please try again later');
            }
        });
    }
    else {
        alert("You must be logged in to use this feature")
    }
});