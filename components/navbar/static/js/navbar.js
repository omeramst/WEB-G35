
//consts and event listeners
const logoutBtn = document.getElementById("logout");
const signupBtn = document.getElementById("signup");
const cookifyBtn = document.getElementById("imagelogo");
const aboutBtn = document.getElementById("aboutus");
const userinfobtn = document.getElementById("userinfo");
const recipes = document.getElementById("recipes");
const ingredientsbut = document.getElementById("ingredients");
const user = JSON.parse(localStorage.getItem('user'));

//check if user is logged in
window.onload = function () {
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
}

//logout button
logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    //remove user from local storage
    localStorage.removeItem('user');
    //navbar display changes
    const logoutbutn = document.getElementById("logout");
    const userinfobtn = document.getElementById("userinfo");
    const loginbutn = document.getElementById("login");
    const signupbutn = document.getElementById("signup");
    loginbutn.style.display = "block";
    signupbutn.style.display = "block";
    logoutbutn.style.display = "none";
    userinfobtn.style.display = "none";
});

//signup button
signupBtn.addEventListener("click", function (e) {
    e.preventDefault();
    //variables
    window.location.href = "SignUp.html";
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
recipes.addEventListener("click", function (e) {
    e.preventDefault();
    window.location.href = "Recipes.html";
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
