require('dotenv').config();
require('isomorphic-fetch');

const weather_key = process.env.weather_key;
const google_key = process.env.google_key;

let getLngLat = (req, res, next) => {
  console.log('from the helper')
  fetch(`https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${req.body.zip}&key=${google_key}`)
  .then(fetchRes => {
      return fetchRes.json();
      next();
  }).then(jsonRes => {
      res.locals.location = jsonRes.results[0].formatted_address;      
      res.locals.lat = jsonRes.results[0].geometry.location.lat;
      res.locals.lng = jsonRes.results[0].geometry.location.lng;
      next();
  }).catch(err => {
      console.log(err);
      next();
  })
}

let weatherLookUp = (req, res, next) => {
  fetch(`https://api.darksky.net/forecast/${weather_key}/${res.locals.lat},${res.locals.lng}`)
  .then(fetchRes => {
    return fetchRes.json();
    next();
  }).then(jsonRes => {
    res.locals.weather = jsonRes;
    next();
  }).catch(err => console.log(err));
}


module.exports = { getLngLat, weatherLookUp };