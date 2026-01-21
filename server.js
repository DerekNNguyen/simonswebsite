const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const productsPath = path.join(__dirname, "data/products.json");
const bookingsPath = path.join(__dirname, "data/bookings.json");

app.get("/api/products", (req, res) => {
  const products = JSON.parse(fs.readFileSync(productsPath));
  res.json(products);
});

app.post("/api/book", (req, res) => {
  const booking = { id: Date.now(), ...req.body };
  const bookings = JSON.parse(fs.readFileSync(bookingsPath));
  bookings.push(booking);
  fs.writeFileSync(bookingsPath, JSON.stringify(bookings, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});