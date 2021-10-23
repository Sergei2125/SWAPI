import "./styles/index.scss";

const pagination = document.querySelector(".pagination");

let getData = require("./js/getData.js");
let getContentFromPage = require("./js/getContentFromPage.js");
let getDataFromMenu = require("./js/getDataFromMenu.js");
let getSearchResult = require("./js/getResultOfSearch.js");
let takeDataFromLocalStorage = require("./js/takeDataFromLocalStorage.js");

const dropDownMenu = document.querySelector(".dropdown-menu");
const formInputValue = document.querySelector(".form-control");
const form = document.querySelector(".d-flex");

let currentContent = "people";
let currentPage = 1;
let searchValue;
let currentUrl = `${currentContent}/?page=${currentPage}`;

if (localStorage[currentUrl]) {
  takeDataFromLocalStorage(currentUrl);
} else {
  getData(currentUrl);
}

pagination.addEventListener("click", (event) => {
  currentPage = event.target.textContent;
  getContentFromPage(currentContent, currentPage);
});

dropDownMenu.addEventListener("click", (event) => {
  currentContent = event.target.textContent.toLowerCase();
  getDataFromMenu(currentContent);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchValue = formInputValue.value;
  getSearchResult(currentContent, searchValue);
});

formInputValue.addEventListener("search", () => {
  searchValue = "";
  takeDataFromLocalStorage(currentUrl);
});

// export { itemsList, itemPages };
