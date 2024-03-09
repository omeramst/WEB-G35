//consts and event listeners
const logoutBtn = document.getElementById("logout");
const signupBtn = document.getElementById("signup");
const cookifyBtn = document.getElementById("imagelogo");
const aboutBtn = document.getElementById("aboutus");
const userinfobtn = document.getElementById("userinfo");
const recipesbtn = document.getElementById("recipes");
const ingredientsbut = document.getElementById("ingredients");
//check if user is logged in
var loggedIn = false;

//check if user is logged in
window.onload = async function () {
    const logoutbutn = document.getElementById("logout");
    const userinfobtn = document.getElementById("userinfo");
    const loginbutn = document.getElementById("login");
    const signupbutn = document.getElementById("signup");
    await fetch('/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            loggedIn = data.logged_in; // Assign the value of data.loggedIn to the loggedIn variable

        })
        .catch(error => {
            console.error('Error:', error);
        });
    if (loggedIn) {
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
}

//logout button
logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    //logout route
    window.location.href = "logout";

});

//signup button
signupBtn.addEventListener("click", function (e) {
    e.preventDefault();
    //variables
    window.location.href = "signup";
});

//cookify button
cookifyBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "homepage";
});

//about button
aboutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "aboutus";
});

//user info button
userinfobtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "userinfo";
});

//recipe button
recipesbtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "recipes";
});
//ingredient button
ingredientsbut.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "ingredients";
});

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
