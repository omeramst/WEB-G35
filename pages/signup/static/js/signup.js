
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
signupbtn.addEventListener('click', function(e){
    e.preventDefault()
    user.username = document.querySelector('#username').value
    user.email = document.querySelector('#email').value
    user.password = document.querySelector('#password').value
    user.confirmPassword = document.querySelector('#confirmPassword').value
    console.log(`userDetails ${ user.confirmPassword}`)
    console.log(`userDetails ${ user.password}`)
    console.log(`userDetails ${ user.email}`)
    console.log(`userDetails ${ user.username}`)
    if(user.username === '' || user.email === '' || user.password === '' || user.confirmPassword === ''){
        alert('Please fill in all fields')
    }else if(user.password !== user.confirmPassword){
        alert('Password do not match')
    }else {
        // Remove the current form
        const currentForm = document.querySelector('.signUpForm');
        currentForm.innerHTML = `
              <img class="logo" src="photos/Logo.png" alt="logo"></img>
              <h1 class="signHeader">Additional Information</h1>
              <label class="label">Select Your Favorite Cuisine:</label>
              <select class="multipuleSelection" id="favoriteCuisine" name="favoriteCuisine" multiple>
              <option class="option" value="italian">Italian</option>
              <option class="option" value="mexican">Mexican</option>
              <option class="option" value="japanese">Japanese</option>
              <option class="option" value="indian">Indian</option>
                </select>

              <label class="label">Select Your Food Sensitivities:</label>
              <select class="multipuleSelection" id="foodSensitivity" name="foodSensitivity" multiple>
              <option class="option" value="gluten">Gluten</option>
              <option class="option" value="dairy">Dairy</option>
              <option class="option" value="nuts">Nuts</option>
              <option class="option" value="soy">Soy</option>
              <option class="option" value="shellfish">Shellfish</option>
                 </select>
            <button type="submit" id="signup">Sign Up</button>
            <p>Already have an account? <a href="HomePage.html">Home page</a></p>
            `;
        const signup = document.querySelector('#signup');
        signup.addEventListener('click', function(e){
            e.preventDefault();
            user.favoriteCuisine = Array.from(document.querySelector('#favoriteCuisine').selectedOptions).map(option => option.value);
            user.foodSensitivity = Array.from(document.querySelector('#foodSensitivity').selectedOptions).map(option => option.value);
            //user details to user object
            const userFinal = new User(user.username, user.password, user.email, user.favoriteCuisine, user.foodSensitivity);
            //store user in local storage
            localStorage.setItem('user', JSON.stringify(userFinal));
            //redirect to home page
            window.location.href = "homepage";

        })
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



