const getData = require("./getData.js");
const takeDataFromLocalStorage = require("./takeDataFromLocalStorage.js");

const getContentFromPage = (pathForData, currentPage = 1) => {
  const requestUrl = `${pathForData}${currentPage}`;
  if (localStorage[requestUrl]) {
    takeDataFromLocalStorage(requestUrl, currentPage);
  } else {
    getData(requestUrl, currentPage);
  }
};

module.exports = getContentFromPage;
