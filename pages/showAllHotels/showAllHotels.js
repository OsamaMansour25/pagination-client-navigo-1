import { API_URL, FETCH_NO_API_ERROR } from "../../settings.js"
import { makeOptions, handleHttpErrors } from "../../utils.js"
document.addEventListener("DOMContentLoaded", initListOfHotels);

export async function initListOfHotels() {
    
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
}
