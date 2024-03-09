//check if user is logged in
window.addEventListener('load', function () {

})

//variables
const user = new User();
const submit = document.getElementById("submit");

//function submit
submit.addEventListener("click", async function (e) {
    e.preventDefault();

    //changing the user details
    user.username = document.getElementById("username").value;
    user.password = document.getElementById("password").value;
    user.email = document.getElementById("email").value;
    user.cuisine = getSelectedOptions("favoriteCuisine")
    user.sensitive = getSelectedOptions("foodSensitivity")

    //check if user details are valid
    if (!user.username || !user.password || !user.email || !user.cuisine || !user.sensitive) {
        //message
        const message = document.getElementById("message");
        message.innerHTML = "Please fill in all the fields";
        message.style.display = "block";
        message.classList.add('hide');
        setTimeout(() => {
            message.classList.remove('hide');
            message.innerHTML = "";
            message.style.display = "none";
        }, 2000);
        return;
    }
    if (user.password.length < 8) {
        //message
        const message = document.getElementById("message");
        message.innerHTML = "Password must be at least 8 characters long";
        message.style.display = "block";
        message.classList.add('hide');
        setTimeout(() => {
            message.classList.remove('hide');
            message.innerHTML = "";
            message.style.display = "none";
        }, 2000);
        return;
    }
    if (!user.email.includes("@") || !user.email.includes(".")) {
        //message
        const message = document.getElementById("message");
        message.innerHTML = "Please enter a valid email address";
        message.style.display = "block";
        message.classList.add('hide');
        setTimeout(() => {
            message.classList.remove('hide');
            message.innerHTML = "";
            message.style.display = "none";
        }, 2000);
        return;
    }

    var data;
    //update user details
    await fetch('userinfo', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    }).then(response => response.json()).then(data => {
    if (data.success) {

        //message
        const message = document.getElementById("message");
        message.innerHTML = "Your details have been updated";
        message.style.display = "block";
        message.classList.add('hide');
        setTimeout(() => {
            message.classList.remove('hide');
            message.innerHTML = "";
            message.style.display = "none";
        }, 2000);
    } else {
        if (data.error === "email already exist") {
            //message
            const message = document.getElementById("message");
            message.innerHTML = "Email already exists";
            message.style.display = "block";
            message.classList.add('hide');
            setTimeout(() => {
                message.classList.remove('hide');
                message.innerHTML = "";
                message.style.display = "none";
            }, 2000);
            return;
        } else {

            //message
            const message = document.getElementById("message");
            message.innerHTML = "Your details have not been updated, please try again";
            message.style.display = "block";
            message.classList.add('hide');
            setTimeout(() => {
                message.classList.remove('hide');
                message.innerHTML = "";
                message.style.display = "none";
            }, 2000);
        }
    }
});
});


function getSelectedOptions(selectId) {
    const selectElement = document.getElementById(selectId);
    const selectedOptions = Array.from(selectElement.options)
        .filter(option => option.selected)
        .map(option => option.value);
    return selectedOptions;
}

