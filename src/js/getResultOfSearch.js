const baseUrl = "https://swapi.dev/api/";
let createPageContent = require("./createPageContent.js");

async function getSearchResult(currentContent, searchValue) {
  const requestUrl = `${baseUrl}${currentContent}/?search=${searchValue}`;

  const response = await fetch(requestUrl).then((response) => response.json());
  const dataResponse = response.results;
  const numberOfCards = response.count;

  if (numberOfCards === 0) {
    const message = [{ resultOfSearch: "No result find" }];
    createPageContent(message, numberOfCards);
  } else {
    console.log(dataResponse, numberOfCards);
    createPageContent(dataResponse, numberOfCards);
  }
}

module.exports = getSearchResult;
