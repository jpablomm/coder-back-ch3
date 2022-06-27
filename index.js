const fs = require("fs");
const express = require("express");
const contenedor = require("./lib/contenedor");

// CONTAINER SETUP
// -----------------------------------------------------------------------
// delete data.txt if exists
try {
  fs.unlink("data.txt", (err) => {
    if (err) {
      console.log("data.txt didn't exist so it was created");
    } else {
      console.log("data.txt file removed and recreated");
    }
  });
} catch (error) {
  console.log(error);
}

// create container instance
const newContainer = new contenedor("data.txt");

// Mock data for the file
const mockData = [
  {
    title: "pelota de futbol",
    price: 80,
    thumbnail: "http://futbol.com",
  },
  {
    title: "pelota de basketball",
    price: 95,
    thumbnail: "http://basket.com",
  },
  {
    title: "pelota de tenis",
    price: 190,
    thumbnail: "http://tenis.com",
  },
];

// upload data to the file
async function uploadData(container, data) {
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    await container.save(item);
  }
}

uploadData(newContainer, mockData);

// SERVER SET UP
// -----------------------------------------------------------------------
const app = express();
const PORT = 8080;

// route to retrieve all products
app.get("/productos", (req, res) => {
  newContainer.getAll().then((data) => {
    res.send(data);
  });
});

app.get("/productorandom", (req, res) => {
  newContainer.getAll().then((data) => {
    const max = data.length;
    const randomInt = Math.floor(Math.random() * max);
    const randomItem = data[randomInt];
    res.send(randomItem);
  });
});

// route to retrieve random product

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
