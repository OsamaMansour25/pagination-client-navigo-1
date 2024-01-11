import { makeOptions } from "../../utils.js";
import { API_URL } from "../../settings.js";

export async function initCreateReservation() {
    const createButton = document.getElementById("create");

    if (createButton) {
        createButton.addEventListener("click", async function(event) {
            event.preventDefault();
            console.log("Create Reservation clicked");
            try {
                await createReservation();
            } catch (error) {
                console.error("Reservation Creation Error:", error);
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", initCreateReservation);

async function createReservation() {
    try {
        const roomId = parseInt(document.getElementById("roomId").value, 10);
        const guestId = parseInt(document.getElementById("guestId").value, 10);
        const reservationDate = document.getElementById("reservationDate").value;

        const url = `${API_URL}/reservations?roomId=${roomId}&guestId=${guestId}&reservationDate=${reservationDate}`;

        const response = await fetch(url, makeOptions("POST", {}, true)); // Tomt objekt i body
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create reservation');
        }

        const reservationResponse = await response.json();
        console.log('Reservation created:', reservationResponse);
        alert('Reservation created successfully!');
        // Redirect eller opdater siden efter behov
    } catch (error) {
        console.error("Error:", error);
        alert('Failed to create reservation.');
    }
}


