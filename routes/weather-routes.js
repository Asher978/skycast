const express = require('express');
const weatherRoutes = express.Router();
const weatherHelper = require('../services/weather-helper');

weatherRoutes.post('/', weatherHelper.getLngLat, weatherHelper.weatherLookUp, (req, res) => {res.json({
  data: res.locals.weather,
  location: res.locals.location

})
});


module.exports = weatherRoutes;