const express = require("express");
const path = require("path");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//for advance templating
const hbs = require("hbs");

const app = express();

const port = process.env.PORT || 3000;

//app.com
//app.com/about
//app.com/help

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

// setup handlebars engine and location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Chirag Boghara",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    name: "Chirag Boghara",
    title: "Help",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Chirag Boghara",
  });
});

app.get("/weather", (req, res) => {
  if (req.query.address === undefined || req.query.address === "") {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(req.query.address, (error, { longitude, latitude, place } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }

    forecast(latitude, longitude, (error, forecastdata) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: forecastdata,
        address: req.query.address,
        location: place,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Chirag Boghara",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Chirag Boghara",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
