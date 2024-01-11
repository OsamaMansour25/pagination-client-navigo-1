import { API_URL, FETCH_NO_API_ERROR } from "../../settings.js";
import { makeOptions, handleHttpErrors } from "../../utils.js";
const hotelId = localStorage.getItem('editHotelId');
export async function initEditHotel() {
   
    if (!hotelId) {
        alert('No hotel selected for editing');
        window.location.href = 'index.html'; // Redirect to a default page
        return;
    }
    retrieveData();
    saveHotel();
}
    async function retrieveData() {

    try {
        const response = await fetch(`${API_URL}/hotels/${hotelId}`, makeOptions("GET"));
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const hotel = await response.json();

        // Udfyld formularfelterne med hoteloplysningerne
        document.getElementById('name').value = hotel.name;
        document.getElementById('street').value = hotel.street;
        document.getElementById('city').value = hotel.city;
        document.getElementById('zip').value = hotel.zip;
        document.getElementById('country').value = hotel.country;
        document.getElementById('numberOfRooms').value = hotel.numberOfRooms;
    } catch (error) {
        console.error('Failed to fetch hotel data:', error);
        alert('Failed to fetch hotel data.');
    }
}

    const form = document.getElementById('editHotelForm');
async function saveHotel() {
    form.onsubmit = async (e) => {
        e.preventDefault();

        // Samler de opdaterede oplysninger fra formularfelterne
        const updatedHotel = {
            name: document.getElementById('name').value,
            street: document.getElementById('street').value,
            city: document.getElementById('city').value,
            zip: parseInt(document.getElementById('zip').value, 10),
            country: document.getElementById('country').value,
            numberOfRooms: parseInt(document.getElementById('numberOfRooms').value, 10)
        };

        try {
            const response = await fetch(`${API_URL}/hotels/${hotelId}`, makeOptions("PUT", updatedHotel));
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            alert('Hotel updated successfully!');
            window.location.href = 'index.html'; // Redirect efter opdatering
        } catch (error) {
            console.error('Failed to update hotel:', error);
            alert('Failed to update hotel.');
        }
    };
}

document.addEventListener('DOMContentLoaded', initEditHotel);

