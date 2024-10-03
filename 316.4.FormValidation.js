const registrationForm = document.getElementById("registration");

let errors = [];
function showErrors(errors) {
  const errorDisplay = document.getElementById("errorDisplay");
  errorDisplay.innerHTML = errors.join("<br>");
  errorDisplay.style.display = "block";
}
registrationForm.addEventListener("submit", function (e) {
  e.preventDefault();

  try {
    // Make a object from the form
    const formData = new FormData(registrationForm);
    // The username cannot be blank.
    // The username must be at least four characters long.
    // The username must contain at least two unique characters.
    // The username cannot contain any special characters or whitespace.
    if (formData.get("username").length < 4) {
      errors.push("The username must be at least four characters long.");
    }
    if (/[^\w]/.test(formData.get("username"))) {
      errors.push(
        " The username cannot contain any special characters or whitespace."
      );
    }
    if (new Set(formData.get("username")).size < 2) {
      errors.push("Username must have two unique characters.");
    }

    // Registration Form - Email Validation:
    // The email must be a valid email address.
    // The email must not be from the domain "example.com."
    if (/\S+@\S+\.\S+/.test(formData.get("email"))) {
      errors.push("The email must not be from the domain (example.com)");
    }
    if (formData.get("password").length < 12) {
      errors.push("Passwords must be at least 12 characters long.");
    }
    // Registration Form - Password Validation:
    // Passwords must be at least 12 characters long.
    // Passwords must have at least one uppercase and one lowercase letter.
    // Passwords must contain at least one number.
    // Passwords must contain at least one special character.
    // Passwords cannot contain the word "password" (uppercase, lowercase, or mixed).
    // Passwords cannot contain the username.
    // Both passwords must match.
  } catch (error) {
    errorDisplay.textContent = "An error occured during form submission";
  }
  showErrors(errors);
  console.log(errorDisplay.innerHTML);

  // console.log(errors)
});

// const loginForm= document.getElementById('login');

// Registration Form - Terms and Conditions:
// The terms and conditions must be accepted.
// Registration Form - Form Submission:
// Usually, we would send this information to an external API for processing. In our case, we are going to process and store the data locally for practice purposes.
// If all validation is successful, store the username, email, and password using localStorage.
// If you are unfamiliar with localStorage, that is okay! Reference the documentation's "Description" and "Examples" sections to learn how to implement it. If you run into issues speak with a peer or one of your instructors.
// Consider how you want to store the user data, keeping in mind that there will be quite a few users registering for the site. Perhaps you want to store it with an array of user objects; or maybe an object whose keys are the usernames themselves.
// Valid usernames should be converted to all lowercase before being stored.
// Valid emails should be converted to all lowercase before being stored.
// Clear all form fields after successful submission and show a success message.
// Registration Form - Username Validation (Part Two):
// Now that we are storing usernames, create an additional validation rule for them...
// Usernames must be unique ("that username is already taken" error). Remember that usernames are being stored all lowercase, so "learner" and "Learner" are not unique.

// Part 4: Login Form Validation Requirements
// For the Login Form section of the page, implement the following validation requirements:
// Login Form - Username Validation:
// The username cannot be blank.
// The username must exist (within localStorage). Remember that usernames are stored in all lowercase, but the username field accepts (and should not invalidate) mixed-case input.
// Login Form - Password Validation:
// The password cannot be blank.
// The password must be correct (validate against localStorage).

// Login Form - Form Submission:

// If all validation is successful, clear all form fields and show a success message.

// If "Keep me logged in" is checked, modify the success message to indicate this (normally, this would be handled by a variety of persistent login tools and technologies
