const baseUrl = "https://swapi.dev/api/";
const createPageContent = require("./createPageContent.js");
const updateLocalStorage = require("./updateLocalStorage.js");

async function getData(requestAddress, currentPage) {
  try {
    const requestUrl = `${baseUrl}${requestAddress}`;
    const response = await fetch(requestUrl).then((response) =>
      response.json()
    );

    const dataResponse = response.results;
    const numberOfCards = response.count;

    createPageContent(dataResponse, numberOfCards, currentPage);
    updateLocalStorage(requestAddress, response);
  } catch (err) {
    console.log(err);
  }
}

module.exports = getData;
