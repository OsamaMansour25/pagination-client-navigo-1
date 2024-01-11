import { API_URL } from "../../settings.js";
import {
  sanitizeStringWithTableRows,
  handleHttpErrors,
  makeOptions,
} from "../../utils.js";

export function initSignup() {
  // Find the "signup" button by its ID on the current page
  const signupButton = document.getElementById("signup");

  if (signupButton) {
    // Add a click event listener to the button if it exists on this page
    signupButton.addEventListener("click", async function (event) {
      event.preventDefault(); // Prevent the default form submission
      console.log("this shit clicked")
      try {
        // Call the signupUser function when the button is clicked
        await signupUser();
      } catch (error) {
        // Handle any errors that occur during signup
        console.error("Signup Error:", error);
      }
    });
  }
}

// Call initSignup when the DOM is loaded
document.addEventListener("DOMContentLoaded", initSignup);

async function signupUser() {
  try {
    
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Create a JavaScript object with the form data
    const formData = {
      email,
      password,
    };

    // Send a POST request to your server to handle user signup
    const response = await fetch(API_URL + "/users", makeOptions("POST", formData, true));

    if (response.ok) {
      // User signup was successful
      const responseData = await response.json();
      alert("User was created successfully")
      window.location.href = "/";
      return responseData;
      
    } else {
      // User signup failed
      const errorData = await response.json();
      throw new Error(errorData.message);
    }
  } catch (error) {
    // Handle any errors that occur during the signup process
    console.error("Error:", error);
    throw error;
  }
}