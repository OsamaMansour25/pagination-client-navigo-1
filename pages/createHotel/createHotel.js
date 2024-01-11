import { makeOptions } from "../../utils.js";
import { API_URL } from "../../settings.js";


export async function initCreateHotel() {
    // Find the "signup" button by its ID on the current page
    const createButton = document.getElementById("create");
  
    if (createButton) {
      // Add a click event listener to the button if it exists on this page
      createButton.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent the default form submission
        console.log("this shit clicked")
        try {
          // Call the signupUser function when the button is clicked
          await createHotel();
        } catch (error) {
          // Handle any errors that occur during signup
          console.error("Signup Error:", error);
        }
      });
    }
  }

  document.addEventListener("DOMContentLoaded", initCreateHotel);
  async function createHotel() {
try {
    const name = document.getElementById("name").value;
    const street = document.getElementById("street").value;
    const city = document.getElementById("city").value;
    const zip = parseInt(document.getElementById("zip").value, 10);
    const country = document.getElementById("country").value;

    const formData = {
      name,
      street,
      city,
      zip,
      country
    };
    const response = await fetch(API_URL + "/hotels", makeOptions("POST", formData, true));
    if (response.ok) {
      // User signup was successful
      alert("User was created successfully")
      window.location.href = "/";
      const responseData = await response.json();
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
  


