import "./styles/index.scss";

const pagination = document.querySelector(".pagination");
const navbar = document.querySelector(".navbar");
const formInputValue = document.querySelector(".form-control");
const form = document.querySelector(".d-flex");

let getData = require("./js/getData.js");
let getContentFromPage = require("./js/getContentFromPage.js");
let getDataFromMenu = require("./js/getDataFromMenu.js");
let getSearchResult = require("./js/getSearchResult.js");
let takeDataFromLocalStorage = require("./js/takeDataFromLocalStorage.js");

let currentContent = "people";
let currentPage = 1;
let searchValue;
let defaultPathForData = `people/?page=1`;
let pathForData = `${currentContent}/?page=`;

if (localStorage[defaultPathForData]) {
  takeDataFromLocalStorage(defaultPathForData);
} else {
  getData(defaultPathForData);
}

pagination.addEventListener("click", (event) => {
  const targetTeg = event.target;
  if (targetTeg.tagName === "A") {
    currentPage = targetTeg.textContent;
    getContentFromPage(pathForData, currentPage);
  }
});

navbar.addEventListener("click", (event) => {
  const targetTeg = event.target;
  if (targetTeg.tagName === "A") {
    document.querySelector(".activeMenu").classList.remove("activeMenu");
    targetTeg.classList.add("activeMenu");
    currentContent = targetTeg.textContent.toLowerCase();

    pathForData = `${currentContent}/?page=`;

    getDataFromMenu(pathForData);
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchValue = formInputValue.value;

  pathForData = `${currentContent}/?search=${searchValue}&page=`;

  getSearchResult(currentContent, searchValue);
});

formInputValue.addEventListener("search", () => {
  searchValue = "";
  takeDataFromLocalStorage(defaultPathForData);
});
