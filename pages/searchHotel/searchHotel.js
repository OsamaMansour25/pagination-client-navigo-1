import { API_URL } from "../../settings.js";
document.addEventListener("DOMContentLoaded", initSearchHotelById);


export async function initSearchHotelById() {
    // Find the "signup" button by its ID on the current page
    const searchButton = document.getElementById("search");
  
    if (searchButton) {
      // Add a click event listener to the button if it exists on this page
      searchButton.addEventListener("click", async function (event) {
        event.preventDefault(); // Prevent the default form submission
        console.log("this shit clicked")
        try {
          // Call the signupUser function when the button is clicked
          await getHotelById();
        } catch (error) {
          // Handle any errors that occur during signup
          console.error("Signup Error:", error);
        }
      });
    }
  }


async function getHotelById() {
    const id = document.getElementById('hotelId').value;
    if (!id) {
        alert('Please enter a hotel ID.');
        return;
    }

    const urlWithId = `${API_URL}/hotels/${id}`;  // Bruger template string til at inkludere ID

    try {
        const response = await fetch(urlWithId);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const hotelData = await response.json();
        displayHotelInfo(hotelData);
    } catch (error) {
        console.error('Failed to fetch hotel:', error);
        document.getElementById('hotelInfo').innerText = 'Failed to fetch hotel information.';
    }
}

function displayHotelInfo(hotel) {
    const hotelInfoDiv = document.getElementById('hotelInfo');
    hotelInfoDiv.innerHTML = `
        <h2>Hotel Information</h2>
        <p><strong>ID:</strong> ${hotel.id}</p>
        <p><strong>Name:</strong> ${hotel.name}</p>
        <p><strong>Address:</strong> ${hotel.street}, ${hotel.city}, ${hotel.zip}, ${hotel.country}</p>
        <p><strong>Number of Rooms:</strong> ${hotel.numberOfRooms}</p>
        <p><strong>Created:</strong> ${hotel.created}</p>
        <p><strong>Updated:</strong> ${hotel.updated}</p>
    `;
}


