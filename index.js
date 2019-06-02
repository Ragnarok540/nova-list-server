require('rootpath')();
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use('/task', require('./task/task.controller'));
app.use('/option', require('./option/option.controller'));

app.listen(8000, () => {
  console.log('Server started!');
});
