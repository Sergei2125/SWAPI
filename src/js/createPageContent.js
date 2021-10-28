const pagination = document.querySelector(".pagination");
const accordion = document.querySelector(".accordion");

//clear main content from page

const clearPageContent = () => {
  const itemsList = document.querySelectorAll(".accordion-item");
  const numbersPages = document.querySelectorAll(".page-item");

  itemsList.forEach((elem) => {
    elem.remove();
  });
  numbersPages.forEach((elem) => {
    elem.remove();
  });
};

const createArrayOfData = (dataArray) => {
  const numberShownValues = 5;
  const firstElementOfArray = dataArray[0];

  // get first five key of object

  const keysValueObj = Object.keys(firstElementOfArray).splice(
    0,
    numberShownValues
  );

  if (dataArray[0].resultOfSearch === "No result find") {
    const messageErrorContent = `<h2 class="accordion-header">
    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" >
    No result find
    </button>
  </h2>`;

    const message = document.createElement("div");

    message.classList.add("accordion-item");
    message.innerHTML = messageErrorContent;
    accordion.append(message);
  } else {
    dataArray.map((itemArray, index) => {
      //Create first element in card with first key

      const itemTitle = `<h2 class="accordion-header" id="flush-heading${index}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${index}" aria-expanded="false" aria-controls="flush-collapse${index}">
      ${itemArray[keysValueObj[0]]}
      </button>
    </h2>`;

      //create elements of accordion card : items with key 2,3,4,5.

      const itemContent = keysValueObj.slice(1).reduce((result, keyName) => {
        return (result += `<div class="accordion-body"><span>${keyName}:</span> ${itemArray[keyName]}</div>`);
      }, ``);

      const item = document.createElement("div");
      item.classList.add("accordion-item");

      // connect first element of card and other elements of accordion

      item.innerHTML = `${itemTitle}<div id="flush-collapse${index}" class="accordion-collapse collapse" aria-labelledby="flush-heading${index}" data-bs-parent="#accordionFlushExample">${itemContent}</div>`;

      accordion.append(item);
    });
  }
};

const createPagination = (numberPage, currentPage) => {
  let pages = Math.ceil(numberPage / 10);
  const pagesArray = Array.from({ length: pages }, (key, elem) => elem + 1);

  pagesArray.map((linkPage) => {
    const pageContent = `<a class="page-link" href="#">${linkPage}</a>`;
    const pageItem = document.createElement("li");

    pageItem.classList.add("page-item");

    currentPage == linkPage ? pageItem.classList.add("active") : null;

    pageItem.innerHTML = pageContent;

    pagination.append(pageItem);
  });
};

const createPageContent = (dataArray, numberPage, currentPage = 1) => {
  clearPageContent();
  createArrayOfData(dataArray);
  createPagination(numberPage, currentPage);
};

module.exports = createPageContent;
