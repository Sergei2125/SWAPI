import "./styles/index.scss";
import axios from "axios";

const baseUrl = "https://swapi.dev/api/";
let currentContent = "people";
let currentPage = 1;
let searchValue;

if (localStorage[`people/?page=${currentPage}`]) {
  const saveData = JSON.parse(
    localStorage.getItem(`people/?page=${currentPage}`)
  );
  createContent(saveData.results, saveData.count);
} else {
  getData(`people/?page=${currentPage}`);
}
function updateLocalStorage(key, data) {
  localStorage.setItem(`${key}`, JSON.stringify(data));
}
function createContent(dataArray, numberPage) {
  let pages = Math.ceil(numberPage / 10);
  const pagesArray = [];
  for (let i = 1; i <= pages; i++) {
    pagesArray.push(i);
  }
  document.querySelectorAll(".accordion-item").forEach((elem) => {
    elem.remove();
  });
  document.querySelectorAll(".page-item").forEach((elem) => {
    elem.remove();
  });
  const keysValueObj = Object.keys(dataArray[0]).splice(0, 5);
  if (dataArray[0].resultOfSearch === "No result find") {
    document.querySelector(".accordion").insertAdjacentHTML(
      "beforeend",
      `<div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" >
        ${dataArray[0].resultOfSearch}
        </button>
      </h2>
      </div>`
    );
  } else {
    dataArray.map((itemArray, index) => {
      document.querySelector(".accordion").insertAdjacentHTML(
        "beforeend",
        `<div class="accordion-item">
        <h2 class="accordion-header" id="flush-heading${index}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${index}" aria-expanded="false" aria-controls="flush-collapse${index}">
          ${itemArray[keysValueObj[0]]}
          </button>
        </h2>
        <div id="flush-collapse${index}" class="accordion-collapse collapse" aria-labelledby="flush-heading${index}" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">${keysValueObj[1]}: ${
          itemArray[keysValueObj[1]]
        }</div>
          <div class="accordion-body">${keysValueObj[2]}: ${
          itemArray[keysValueObj[2]]
        }</div>
          <div class="accordion-body">${keysValueObj[3]}: ${
          itemArray[keysValueObj[3]]
        }</div>
          <div class="accordion-body">${keysValueObj[4]}: ${
          itemArray[keysValueObj[4]]
        }</div>
        </div>
        
      </div>`
      );
    });
  }
  pagesArray.map((linkPage) => {
    if (currentPage == linkPage) {
      document
        .querySelector(".pagination")
        .insertAdjacentHTML(
          "beforeend",
          `<li class="page-item active" ><a class="page-link" href="#">${linkPage}</a></li>`
        );
    } else {
      document
        .querySelector(".pagination")
        .insertAdjacentHTML(
          "beforeend",
          `<li class="page-item"><a class="page-link" href="#">${linkPage}</a></li>`
        );
    }
  });
}
async function getData(addressResponse) {
  const response = await axios.get(`${baseUrl}${addressResponse}`);

  if (response.data.count === 0) {
    const message = [{ resultOfSearch: "No result find" }];
    createContent(message, 1);
  } else {
    createContent(response.data.results, response.data.count);
  }

  if (!searchValue) {
    updateLocalStorage(addressResponse, response.data);
  }
}
document.querySelector(".pagination").addEventListener("click", (e) => {
  currentPage = e.target.textContent;
  if (localStorage[`${currentContent}/?page=${currentPage}`]) {
    const saveData = JSON.parse(
      localStorage.getItem(`${currentContent}/?page=${currentPage}`)
    );
    createContent(saveData.results, saveData.count);
  } else {
    getData(`${currentContent}/?page=${currentPage}`);
  }
});
document.querySelector(".dropdown-menu").addEventListener("click", (e) => {
  currentContent = e.target.textContent;
  currentPage = 1;
  document.querySelector("#navbarDropdown").textContent = currentContent;
  if (localStorage[`${currentContent}/?page=${currentPage}`]) {
    const saveData = JSON.parse(
      localStorage.getItem(`${currentContent}/?page=${currentPage}`)
    );
    createContent(saveData.results, saveData.count);
  } else {
    getData(`${currentContent}/?page=${currentPage}`);
  }
  getData(`${currentContent}/?page=${currentPage}`);
});
document.querySelector(".d-flex").addEventListener("submit", (e) => {
  e.preventDefault();
  searchValue = document.querySelector(".form-control").value;
  getData(`${currentContent}/?search=${searchValue}`);
});
document.querySelector(".form-control").addEventListener("search", () => {
  searchValue = "";
  const saveData = JSON.parse(
    localStorage.getItem(`${currentContent}/?page=${currentPage}`)
  );
  createContent(saveData.results, saveData.count);
});
