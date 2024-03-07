
const loginBtn = document.getElementById("login");


//login button
loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    //variables
    const popup = document.getElementById("loginPopup");
    const closeButton = document.getElementById("closePopup");
    const submitButton = document.getElementById("loginSubmit");
    //display login popup
    popup.style.display = "flex";
    //event listeners
    //close button
    closeButton.addEventListener("click", function (e) {
        e.preventDefault();
        popup.style.display = "none";
    });
    //submit button
    submitButton.addEventListener("click", function (e) {
        e.preventDefault();
        //variables
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        //validation
        if (email === '' || password === '') {
            alert('Please fill in all fields');
            email.value = "";
            password.value = "";
            consle.log(email, password);
        }
        if (email.indexOf('@') === -1 || email.indexOf('.') === -1)
        {
            alert('Please enter a valid email');
            email.value = "";
            password.value = "";
        }
        else {
        //login route
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                //navbar display changes
                popup.style.display = "none";
                const logoutbutn = document.getElementById("logout");
                const userinfobtn = document.getElementById("userinfo");
                const loginbutn = document.getElementById("login");
                const signupbutn = document.getElementById("signup");
                loginbutn.style.display = "none";
                signupbutn.style.display = "none";
                logoutbutn.style.display = "block";
                userinfobtn.style.display = "block";
            } else {
                alert(data.error);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    });
});
