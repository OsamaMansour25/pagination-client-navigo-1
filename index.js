
import  "navigo_editedbyLars.js";

import {
  setActiveLink, renderHtml, loadHtml
} from "./utils.js"

import {initBooks} from "./pages/books/books.js"
import {initBooksNoPagination} from "./pages/books-nopagination/books.js"
import { initCreateHotel } from "./pages/createHotel/createHotel.js"
import { initListOfHotels } from "./pages/showAllHotels/showAllHotels.js"
import { initSearchHotelById } from "./pages/searchHotel/searchHotel.js";
import { initEditHotel } from "./pages/editHotel/editHotel.js";
import { initCreateRoom } from "./pages/createRoom/createRoom.js";
import { initSignup } from "./pages/signup/signup.js";
import { initCreateReservation } from "./pages/createReservation/createReservation.js";

window.addEventListener("load", async () => {

  const templateBooks = await loadHtml("./pages/books/books.html")
  const templateBooksNoPagination = await loadHtml("./pages/books-nopagination/books.html")
  const templateHome = await loadHtml("./pages/home/home.html")
  const templateCreateHotel = await loadHtml("./pages/createHotel/createHotel.html")
  const templateshowAllHotels = await loadHtml("./pages/showAllHotels/showAllHotels.html")
  const templateSearchHotel = await loadHtml("./pages/searchHotel/searchHotel.html")
  const templateEditHotel = await loadHtml("./pages/editHotel/editHotel.html")
  const templateCreateRoom = await loadHtml("./pages/createRoom/createRoom.html")
  const templateSignup = await loadHtml("./pages/signup/signup.html")
  const templateReservation = await loadHtml("./pages/createReservation/createReservation.html")

  const router = new Navigo("/",{hash:true});
  window.router = router
  router
      .hooks({
        before(done, match) {
          setActiveLink("menu", match.url)
          done()
        }
      })
      .on({
        //For very simple "templates", you can just insert your HTML directly like below
        "/": () => renderHtml(templateHome, "content"),
        "/no-navigo": () => document.getElementById("content").innerHTML=`
           <h3>Handling navigation on the client, if you don't like navigo</h3>
           <br/
           <p>Goto this page (will take you out of the router) <a href="/indexNoNavigoDemo.html">Plain no Navigo example</a></p>
           `,
        "/books": (match) => {
          renderHtml(templateBooks, "content")
          initBooks(match)
        },
        "/signup": () => {
          renderHtml(templateSignup, "content")
          initSignup();
        },
        "/showAllHotels": () => {
          renderHtml(templateshowAllHotels, "content")
          initListOfHotels();
        },
        "/createReservation": () => {
          renderHtml(templateReservation, "content")
          initCreateReservation();
        },
        "/searchHotel": () => {
          renderHtml(templateSearchHotel, "content")
          initSearchHotelById();
        },
        "/editHotel": () => {
          renderHtml(templateEditHotel, "content")
          initEditHotel();
        },
        "/createRoom": () => {
          renderHtml(templateCreateRoom, "content")
          initCreateRoom();
        },
        "/createHotel": () => {
          renderHtml(templateCreateHotel, "content")
          initCreateHotel();
          
        },
        
        "/books-no-pagination": (match) => {
          renderHtml(templateBooksNoPagination, "content")
          initBooksNoPagination()
        },
        
      })
      .notFound(() => document.getElementById("content").innerHTML ="<h2>404 - Page not found</h2>")
      .resolve()
});

function onWindowResize(){
  const width = window.innerWidth
  document.getElementById('width').innerText = ""+width
}
window.addEventListener('resize', onWindowResize)
onWindowResize() //Call manually to display initial width


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
      + ' Column: ' + column + ' StackTrace: ' + errorObj);
}
