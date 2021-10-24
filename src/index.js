import "./styles/index.scss";

const pagination = document.querySelector(".pagination");
const navbar = document.querySelector(".navbar");
const formInputValue = document.querySelector(".form-control");
const form = document.querySelector(".d-flex");

let getData = require("./js/getData.js");
let getContentFromPage = require("./js/getContentFromPage.js");
let getDataFromMenu = require("./js/getDataFromMenu.js");
let getSearchResult = require("./js/getResultOfSearch.js");
let takeDataFromLocalStorage = require("./js/takeDataFromLocalStorage.js");

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
  const targetTeg = event.target;
  if (targetTeg.tagName === "A") {
    currentPage = targetTeg.textContent;
    getContentFromPage(currentContent, currentPage);
  }
});

navbar.addEventListener("click", (event) => {
  const targetTeg = event.target;
  console.log(targetTeg);
  if (targetTeg.tagName === "A") {
    currentContent = targetTeg.textContent.toLowerCase();
    getDataFromMenu(currentContent);
  }
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
