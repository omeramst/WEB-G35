//check if user is logged in
window.onload = function () {
    //displaying user details
    if (user) {
        document.getElementById("username").value = user.username;
        document.getElementById("password").value = user.password;
        document.getElementById("email").value = user.email;
        if (user.cuisine) {
            user.cuisine.forEach(cuisine => {
                document.getElementById("favoriteCuisine").querySelector(`option[value="${cuisine}"]`).selected = true;
            });
        }
        if (user.sensitive) {
            user.sensitive.forEach(sensitive => {
                document.getElementById("foodSensitivity").querySelector(`option[value="${sensitive}"]`).selected = true;
            });
        }
    }
}

//variables
const user = JSON.parse(localStorage.getItem('user')); //need to change server
const submit = document.getElementById("submit");

//function submit
submit.addEventListener("click", function (e) {
    e.preventDefault();

    //changing the user details
    console.log(user);
    user.username = document.getElementById("username").value;
    user.password = document.getElementById("password").value;
    user.email = document.getElementById("email").value;
    user.cuisine = getSelectedOptions("favoriteCuisine")
    user.sensitive = getSelectedOptions("foodSensitivity")
    localStorage.setItem('user', JSON.stringify(user));

    //message
    const message = document.getElementById("message");
    message.innerHTML = "Your details have been updated";
    message.style.display = "block";
    message.classList.add('hide');
    setTimeout(() => {
        message.classList.remove('hide');
        message.innerHTML = "";
        message.style.display = "none";
    }, 1000);

});


function getSelectedOptions(selectId) {
    const selectElement = document.getElementById(selectId);
    const selectedOptions = Array.from(selectElement.options)
        .filter(option => option.selected)
        .map(option => option.value);
    return selectedOptions;
}

