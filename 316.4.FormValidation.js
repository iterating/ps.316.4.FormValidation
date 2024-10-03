
function showErrors(errors) {
    const errorDisplay = document.getElementById("errorDisplay");
    errorDisplay.innerHTML = errors.join("<br>");
    errorDisplay.style.display = "block";
}

let userArray = []
localStorage.setItem("users", JSON.stringify(userArray))


const registrationForm = document.getElementById("registration");
registrationForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let errors = [];
  try {
    // Make a object from the form
    const formData = new FormData(registrationForm);
    // The username cannot be blank.
    // The username must be at least four characters long.
    // The username must contain at least two unique characters.
    // The username cannot contain any special characters or whitespace.
    let username = formData.get("username");
    const usernameValidation = [
      {
        test: () => !username,
        message: "The username cannot be blank.",
      },
      {
        test: () => username.length < 4,
        message: "The username must be at least four characters long.",
      },
      {
        test: () => /[^\w]/.test(username),
        message:
          "The username cannot contain any special characters or whitespace.",
      },
      {
        test: () => new Set(username).size < 2,
        message: "Username must have two unique characters.",
      },
      {
        test: () => localStorage.getItem(username),
        message: "That username is already taken.",
      },
    ];

    usernameValidation.forEach((validation) => {
      if (validation.test()) {
        errors.push(validation.message);
      }
    });

    // Registration Form - Email Validation:
    // The email must be a valid email address.
    // The email must not be from the domain "example.com."
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.get("email"))) {
      errors.push("The email must be a valid email address.");
    }
    if (formData.get("email").endsWith("example.com")) {
      errors.push("The email must not be from the domain example.com");
    }

    // Registration Form - Password Validation:
    // Passwords must be at least 12 characters long.
    // Passwords must have at least one uppercase and one lowercase letter.
    // Passwords must contain at least one number.
    // Passwords must contain at least one special character.
    // Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
    // Passwords cannot contain the username.
    // Both passwords must match.
    const password = formData.get("password");
    const passwordValidation = [
      {
        test: () => password.length < 12,
        message: "Passwords must be at least 12 characters long.",
      },
      {
        test: () => !/[a-z]/.test(password) || !/[A-Z]/.test(password),
        message:
          "The password must contain at least one uppercase and one lowercase letter.",
      },
      {
        test: () => !/[0-9]/.test(password),
        message: "Passwords must contain at least one number.",
      },
      {
        test: () => !/[^\w\s]/.test(password),
        message: "Passwords must contain at least one special character.",
      },
      {
        test: () => password.toLowerCase().includes("password"),
        message:
          "Passwords cannot contain the word 'password' (uppercase, lowercase, or mixed).",
      },
      {
        test: () => password.includes(username),
        message: "Passwords cannot contain the username.",
      },
      {
        test: () => password !== formData.get("passwordCheck"),
        message: "Both passwords must match.",
      },
    ];
    passwordValidation.forEach((validation) => {
      if (validation.test()) {
        errors.push(validation.message);
      }
    });
    // Registration Form - Terms and Conditions:
    // The terms and conditions must be accepted.
    if (!formData.get("terms")) {
      errors.push("The terms and conditions must be accepted.");
    }

    // Registration Form - Form Submission:
    // If all validation is successful, store the username, email, and password using localStorage.
    // Consider how you want to store the user data, keeping in mind that there will be quite a few users registering for the site. Perhaps you want to store it with an array of user objects; or maybe an object whose keys are the usernames themselves.
    // Valid usernames should be converted to all lowercase before being stored.
    // Valid emails should be converted to all lowercase before being stored.
    // Clear all form fields after successful submission and show a success message.
    if (errors.length === 0) {
      console.log("Passed!");
    //   errorDisplay.style.display = "none";
    let userData = {
        userId : Date.now().toString(), //Difficult to implement checking for duplicate usernames
        username : username.toLowerCase(),
        email: formData.get("email").toLowerCase(),
        password: password,
        //is there a way to encrypt the password?
      };
      userArray.push(userData);
      localStorage.setItem("users", JSON.stringify(userArray))

      errorDisplay.innerHTML="Success!"
      registrationForm.reset();

    } else {
      showErrors(errors);
    }
  } catch (error) {
    console.log(error);
  }
});



// [x] Usernames must be unique ("that username is already taken" error). Remember that usernames are being stored all lowercase, so "learner" and "Learner" are not unique.

// Part 4: Login Form Validation Requirements
// For the Login Form section of the page, implement the following validation requirements:
// Login Form - Username Validation:
// The username cannot be blank.
// The username must exist (within localStorage). Remember that usernames are stored in all lowercase, but the username field accepts (and should not invalidate) mixed-case input.
// Login Form - Password Validation:
// The password cannot be blank.
// The password must be correct (validate against localStorage).
const loginForm = document.getElementById("login");
loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let errors = [];
  try {
    const formData = new FormData(loginForm);
    let username = formData.get("username").toLowerCase();
    let password = formData.get("password");

    let userList = JSON.parse(localStorage.getItem("users"));
        
    const usernameValidation = [
      {
        test: () => !username,
        message: "The username cannot be blank.",
      },
      {
        test: () => !userList.find(user => user.username === username),
        message: "The username must exist.",
      },
    ];
    usernameValidation.forEach((validation) => {
      if (validation.test()) {
        errors.push(validation.message);
      }
    });

    if (!password) {
        errors.push("The password cannot be blank.");

      }


      const user = userList.find(user => user.username === username);
      if (user && user.password !== password) {
        errors.push("Incorrect password.");
    }

    if (errors.length === 0) {
        console.log("Passed!");
        const errorDisplay = document.getElementById("errorDisplay");
        errorDisplay.innerHTML="Success!"
        
        if (formData.get("check")) { 
            errorDisplayinnerHTML+=  " You will be kept logged in.";
        }
        loginForm.reset();

    } else {
        showErrors(errors);
      }
} catch (error) {
    console.log(error);
  }
});
// Login Form - Form Submission:

// If all validation is successful, clear all form fields and show a success message.

// If "Keep me logged in" is checked, modify the success message to indicate this (normally, this would be handled by a variety of persistent login tools and technologies
