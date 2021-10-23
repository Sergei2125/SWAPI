let getData = require("./getData.js");
let takeDataFromLocalStorage = require("./takeDataFromLocalStorage.js");

const getContentFromPage = (currentContent, currentPage) => {
  const requestUrl = `${currentContent}/?page=${currentPage}`;
  if (localStorage[requestUrl]) {
    takeDataFromLocalStorage(requestUrl, currentPage);
  } else {
    getData(requestUrl, currentPage);
  }
};

module.exports = getContentFromPage;
