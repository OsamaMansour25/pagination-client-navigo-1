import { makeOptions } from "../../utils.js";
import { API_URL } from "../../settings.js";

export async function initCreateRoom() {
    const createButton = document.getElementById("create");

    if (createButton) {
        createButton.addEventListener("click", async function(event) {
            event.preventDefault();
            console.log("Create Room clicked");
            try {
                await createRoom();
            } catch (error) {
                console.error("Room Creation Error:", error);
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", initCreateRoom);

async function createRoom() {
    try {
        const hotelId = parseInt(document.getElementById("hotelId").value, 10);
        const numberOfBeds = parseInt(document.getElementById("numberOfBeds").value, 10);
        const price = parseInt(document.getElementById("price").value, 10);

        const roomData = {
            numberOfBeds,
            price
            // Tilføj yderligere felter efter behov
        };

        const response = await fetch(`${API_URL}/rooms?hotelId=${hotelId}`, makeOptions("POST", roomData, true));
        if (response.ok) {
            const responseData = await response.json();
            console.log("Room created successfully", responseData);
            alert("Room was created successfully");
            window.location.href = "/"; // Redirect efter oprettelse
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
