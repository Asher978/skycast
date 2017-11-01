const express = require('express');
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');

//instance of express and server setup
const app = express();
const server = require('http').Server(app);

//dotenv settings
require('dotenv').config();

//middleware setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// port settings
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Alive on port ${PORT}`);
})

//index route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});