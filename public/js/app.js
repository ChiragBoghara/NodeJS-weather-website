const weatherForm = document.getElementById("form");
const search = document.getElementById("search");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");
const messageThree = document.getElementById("message-3");

weatherForm.addEventListener("submit", (e) => {
  //to not reload the page
  e.preventDefault();

  const location = search.value;

  messageOne.innerHTML = "Loading...";
  messageTwo.innerHTML = "";
  messageThree.innerHTML = "";

  fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.innerHTML = data.error;
      } else {
        messageOne.innerHTML = data.location;
        messageTwo.innerHTML =
          data.forecast.description +
          ". It is currently " +
          data.forecast.temprature +
          " out there. But Feels like " +
          data.forecast.feels_like +
          " .";
        messageThree.innerHTML =
          "There is " +
          data.forecast.humidity +
          "% humidity and " +
          data.forecast.wind_speed +
          " miles/hour wind speed.";
      }
    });
  });
});
