const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./util/geocode");

const app = express();

const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

app.use(express.static(publicDirPath));

app.set("view engine", "hbs");
app.set("views", viewsDirPath);

hbs.registerPartials(partialsDirPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Express Application",
    name: "Mayank Modi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "Stay @ Home, Stay Safe",
    name: "Mayank Modi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Us",
    about: "I am working with Argusoft India Ltd",
    name: "Mayank Modi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.status(400).send({ error: "Please  provide  the address..." });
  }
  geoCode(req.query.address, (error, response) => {
    if (error) {
      return res.status(400).send({ error });
    }
    let places = [];
    response.forEach((place) => {
      places.push({
        place: place.place_name,
        longitude: place.center[1],
        latitude: place.center[0],
      });
    });
    return res.send(places);
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    errorMessage: "Help article not found...",
    name: "Mayank Modi",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error 404",
    errorMessage: "Page not found...",
    name: "Mayank Modi",
  });
});

const port = process.env.PORT | 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
