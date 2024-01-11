
import  "navigo_editedbyLars.js";

import {
  setActiveLink, renderHtml, loadHtml
} from "./utils.js"

import {initBooks} from "./pages/books/books.js"
import {initBooksNoPagination} from "./pages/books-nopagination/books.js"
import { initCreateHotel } from "./pages/createHotel/createHotel.js"
import { initListOfHotels } from "./pages/showAllHotels/showAllHotels.js"
import { initSearchHotelById } from "./pages/searchHotel/searchHotel.js";

window.addEventListener("load", async () => {

  const templateBooks = await loadHtml("./pages/books/books.html")
  const templateBooksNoPagination = await loadHtml("./pages/books-nopagination/books.html")
  const templateHome = await loadHtml("./pages/home/home.html")
  const templateCreateHotel = await loadHtml("./pages/createHotel/createHotel.html")
  const templateshowAllHotels = await loadHtml("./pages/showAllHotels/showAllHotels.html")
  const templateSearchHotel = await loadHtml("./pages/searchHotel/searchHotel.html")

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
        "/showAllHotels": () => {
          renderHtml(templateshowAllHotels, "content")
          initListOfHotels();
        },
        "/searchHotel": () => {
          renderHtml(templateSearchHotel, "content")
          initSearchHotelById();
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