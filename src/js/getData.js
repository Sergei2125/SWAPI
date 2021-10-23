const baseUrl = "https://swapi.dev/api/";
let createPageContent = require("./createPageContent.js");
let updateLocalStorage = require("./updateLocalStorage.js");

async function getData(requestAddress, currentPage) {
  const requestUrl = `${baseUrl}${requestAddress}`;
  const response = await fetch(requestUrl).then((response) => response.json());

  const dataResponse = response.results;
  const numberOfCards = response.count;
  createPageContent(dataResponse, numberOfCards, currentPage);
  updateLocalStorage(requestAddress, response);
}

module.exports = getData;
