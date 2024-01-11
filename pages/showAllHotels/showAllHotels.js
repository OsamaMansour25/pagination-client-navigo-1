import { API_URL, FETCH_NO_API_ERROR } from "../../settings.js";
import { makeOptions, handleHttpErrors } from "../../utils.js";

async function initListOfHotels() {
    console.log("initListOfHotels is running");
    const errorElement = document.getElementById("error");
    errorElement.innerText = "";

    try {
        const hotels = await fetch(API_URL + "/hotels", makeOptions("GET", null, true)).then(handleHttpErrors);
        const rows = hotels.map(hotel => { 
            return `
            <tr>
                <td>${hotel.id}</td>
                <td>${hotel.name}</td>
                <td>${hotel.street}, ${hotel.city}, ${hotel.zip}, ${hotel.country}</td>
                <td>${hotel.numberOfRooms}</td>
                <td>
                    <button onclick="editHotel(${hotel.id})">Edit</button>
                    <button onclick="deleteHotel(${hotel.id})">Delete</button>
                </td>
            </tr>
            `;
        }).join("\n");

        document.getElementById("hotels-table-rows").innerHTML = rows;
    } catch (err) {
        if (err.apiError) {
            errorElement.innerText = err.apiError.message;
        } else {
            errorElement.innerText = err.message + FETCH_NO_API_ERROR;
            console.error(err.message + FETCH_NO_API_ERROR);
        }
    }


window.editHotel = (hotelId) => {
    localStorage.setItem('editHotelId', hotelId);
    window.location.href = '../editHotel/editHotel.html';
}

window.deleteHotel = async (hotelId) => {
    if (confirm("Are you sure you want to delete this hotel?")) {
        try {
            const response = await fetch(`${API_URL}/hotels/${hotelId}`, makeOptions("DELETE"));
            if (response.ok) {
                alert('Hotel deleted successfully');
                initListOfHotels();
            } else {
                throw new Error('Failed to delete the hotel');
            }
        } catch (error) {
            console.error('Error during hotel deletion:', error);
            alert('Failed to delete the hotel.');
        }
    }
};


}
// Kontrollerer, om DOM er fuldt indlæst
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initListOfHotels);
} else {
    initListOfHotels();
}
