class userDetails {
    constructor(username, email, password, confirmPassword, favoriteCuisine, foodSensitivity) {
        this.username = username || '';
        this.email = email || '';
        this.password = password || '';
        this.confirmPassword = confirmPassword || '';
        this.favoriteCuisine = favoriteCuisine || [];
        this.foodSensitivity = foodSensitivity || [];
    }
}

const user = new userDetails()
const signupbtn = document.querySelector('#btn')
signupbtn.addEventListener('click', async function (e) {
    e.preventDefault()
    user.username = document.querySelector('#username').value
    user.email = document.querySelector('#email').value
    user.password = document.querySelector('#password').value
    user.confirmPassword = document.querySelector('#confirmPassword').value
    console.log(`userDetails ${user.confirmPassword}`)
    console.log(`userDetails ${user.password}`)
    console.log(`userDetails ${user.email}`)
    console.log(`userDetails ${user.username}`)

    if (user.username === '' || user.email === '' || user.password === '' || user.confirmPassword === '') {
        alert('Please fill in all fields')
    } else if (user.password !== user.confirmPassword) {
        alert('Password do not match')
    } else if (user.password.length < 8) {
        alert('Password must be at least 8 characters long')
    } else if (user.email.indexOf('@') === -1 && user.email.indexOf('.') === -1) {
        alert('Invalid email')
    } else if (user.username.length < 3) {
        alert('Username must be at least 3 characters long')
    } else if (user.username.length > 20) {
        alert('Username must be less than 20 characters long')
    } else if (user.password.length > 20) {
        alert('Password must be less than 20 characters long')
    } else {
        //check if user already exists in the database
        const uservalid = await validateUser(user); // Add await here
        console.log(uservalid)
        if (uservalid === false) {
            alert('Email already exists')
        } else {
            console.log(uservalid)
            // Remove the current form
            const currentForm = document.querySelector('.form1');
            const nextForm = document.querySelector('.form2');
            // Hide the current form by display none
            currentForm.style.display = 'none';
            nextForm.style.display = 'block';
            const signup = document.querySelector('#signup');
            signup.addEventListener('click', async function (e) {
                e.preventDefault();
                user.favoriteCuisine = Array.from(document.querySelector('#favoriteCuisine').selectedOptions).map(option => option.value);
                user.foodSensitivity = Array.from(document.querySelector('#foodSensitivity').selectedOptions).map(option => option.value);
                //user details to user object
                const userFinal = new User(user.username, user.password, user.email, user.favoriteCuisine, user.foodSensitivity);
                //signup route
                const result = await usersignup(userFinal);
                if (result['success'])
                    window.location.href = "homepage";
                else
                    alert('Error occurred, please try again');

            })
        }
    }
})

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

async function validateUser(user) {
    try {
        const response = await fetch('/signupval', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });
        const data = await response.json();
        const uservalid = data.success;
        console.log(uservalid);
        return uservalid;
    } catch (err) {
        alert('Error occurred, please try again 1');
        return false;
    }
}
async function usersignup(user) {
    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });
        const data = await response.json();
        return data;
    } catch (err) {
        alert('Error occurred, please try again');
    }
}
//


