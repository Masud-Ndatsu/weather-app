const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const app = express();

// Defined path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup up view engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static files
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ndatsu Masud",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ndatsu Masud",
  });
});
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    res.send({
      error: "You must provide a search term!",
    });
  } else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        res.send({
          error,
        });
      } else {
        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            res.send({
              error,
            });
          } else {
            res.send({
              location,
              address,
              forecast: forecastData,
            });
          }
        });
      }
    });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term!",
    });
  }
  res.send({
    products: [],
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    message: "Here is a little help message.",
    name: "Ndatsu Masud",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Ndatsu Masud",
    errorMessage: "Page not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page",
    name: "Ndatsu Masud",
    errorMessage: "Help article not found!",
  });
});
app.listen(3000, () => console.log("Server is up on port 3000"));
