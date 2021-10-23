const updateLocalStorage = (keyValue, dataValue) => {
  const key = keyValue;
  const value = JSON.stringify(dataValue);
  localStorage.setItem(key, value);
};

module.exports = updateLocalStorage;
