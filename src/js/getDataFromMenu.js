const navDropDownMEnu = document.querySelector("#navbarDropdown");
let getData = require("./getData.js");
let takeDataFromLocalStorage = require("./takeDataFromLocalStorage.js");

const getDataFromMenu = (currentContent) => {
  currentPage = 1;
  navDropDownMEnu.textContent = currentContent;
  const requestUrl = `${currentContent}/?page=${currentPage}`;

  if (localStorage[requestUrl]) {
    takeDataFromLocalStorage(requestUrl, currentPage);
  } else {
    getData(requestUrl, currentPage);
  }
};

module.exports = getDataFromMenu;
