let createPageContent = require("./createPageContent.js");

const takeDataFromLocalStorage = (requestUrl, currentPage = 1) => {
  const dataFromLocalStorage = localStorage.getItem(requestUrl);
  const parsedData = JSON.parse(dataFromLocalStorage);
  createPageContent(parsedData.results, parsedData.count, currentPage);
};

module.exports = takeDataFromLocalStorage;
