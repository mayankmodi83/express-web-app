console.log("Javascript loaded....");

const searchLocation = (location, callback) => {
  fetch("/weather?address=" + location).then((response) => {
    return response.json().then((data) => {
      if (data.error) {
        callback(data.error, null);
      } else {
        callback(null, data);
      }
    });
  });
};

const form = document.querySelector("form");
const input = document.querySelector("input");
const p = document.querySelector("p");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const location = input.value;
  p.innerHTML = "Loading....";
  searchLocation(location, (error, response) => {
    if (error) {
      console.error(error);
      p.innerHTML = "<span style='color: red'>" + error + "</span>";
    } else {
      const place = response[0];
      console.log(place);
      p.innerHTML = `<b>For the place "${place.place}" coordinates are ${place.latitude}, ${place.longitude}</b>`;
    }
  });
});
