export let API_URL = ""

if (window.location.hostname === 'localhost' || window.location.hostname === "127.0.0.1") {
  API_URL = "http://localhost:8080/api"
} 

export const FETCH_NO_API_ERROR = " (Is the API online or did the endpoint exists ?)"