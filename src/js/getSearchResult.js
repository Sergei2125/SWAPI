const baseUrl = "https://swapi.dev/api/";
const createPageContent = require("./createPageContent.js");

async function getSearchResult(currentContent, searchValue) {
  try {
    const requestUrl = `${baseUrl}${currentContent}/?search=${searchValue}`;

    const response = await fetch(requestUrl).then((response) =>
      response.json()
    );
    const dataResponse = response.results;
    const numberOfCards = response.count;

    if (numberOfCards === 0) {
      const message = [{ resultOfSearch: "No result find" }];
      createPageContent(message, numberOfCards);
    } else {
      createPageContent(dataResponse, numberOfCards);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = getSearchResult;
