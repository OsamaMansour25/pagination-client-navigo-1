import { API_URL, FETCH_NO_API_ERROR } from "../../settings.js"
import { makeOptions, sanitizeStringWithTableRows, handleHttpErrors } from "../../utils.js"
document.addEventListener("DOMContentLoaded", initListOfHotels);

export async function initListOfHotels() {
    
    console.log("initListOfHotels is running");
    document.getElementById("error").innerText = ""
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

        const safeRows = sanitizeStringWithTableRows(rows);
        document.getElementById("hotels-table-rows").innerHTML = safeRows;
    } catch (err) {
        if (err.apiError) {
            document.getElementById("error").innerText = err.apiError.message;
        } else {
            document.getElementById("error").innerText = err.message + FETCH_NO_API_ERROR;
            console.error(err.message + FETCH_NO_API_ERROR);
        }
    }
}



