const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

let hotels = require("./hotels");
hotels=hotels.hotels;

app.get('/hotels/sort/pricing', (req, res) => {
  const pricingOrder = req.query.pricing || 'low-to-high';
  const sortedHotels = hotels
    .slice()
    .sort((a, b) =>
      pricingOrder === 'low-to-high' ? a.price - b.price : b.price - a.price
    );
  res.json({ hotels: sortedHotels });
});

app.get('/hotels/sort/rating', (req, res) => {
  const ratingOrder = req.query.rating || 'high-to-low';
  const sortedHotels = hotels
    .slice()
    .sort((a, b) =>
      ratingOrder === 'low-to-high' ? a.rating - b.rating : b.rating - a.rating
    );
  res.json({ hotels: sortedHotels });
});

app.get('/hotels/sort/reviews', (req, res) => {
  const reviewOrder = req.query.reviews || 'most-to-least';
  const sortedHotels = hotels
    .slice()
    .sort((a, b) =>
      reviewOrder === 'least-to-most'
        ? a.reviews - b.reviews
        : b.reviews - a.reviews
    );
  res.json({ hotels: sortedHotels });
});

app.get('/hotels/filter/amenity', (req, res) => {
  const amenity = (req.query.amenity || '').toLowerCase();
  const filteredHotels = hotels.filter(
    (hotel) => hotel.amenity.toLowerCase() === amenity
  );
  res.json({ hotels: filteredHotels });
});

app.get('/hotels/filter/country', (req, res) => {
  const country = (req.query.country || '').toLowerCase();
  const filteredHotels = hotels.filter(
    (hotel) => hotel.country.toLowerCase() === country
  );
  res.json({ hotels: filteredHotels });
});

app.get('/hotels/filter/category', (req, res) => {
  const category = (req.query.category || '').toLowerCase();
  const filteredHotels = hotels.filter(
    (hotel) => hotel.category.toLowerCase() === category
  );
  res.json({ hotels: filteredHotels });
});

app.get('/hotels', (req, res) => {
  res.json({ hotels });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
