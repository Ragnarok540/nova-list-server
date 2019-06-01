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

app.listen(8000, () => {
  console.log('Server started!');
});
 
let db = new sqlite3.Database('./db/nova_list.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the nova-list database.');
});

//SELECT AN OPTION VALUE
app.route('/api/options/:option_name').get((req, res) => {

  const OPTION_NAME = req.params['option_name'];

  let sql = `SELECT * FROM OPTIONS
             WHERE option_name = ?`;
 
	db.get(sql, [OPTION_NAME], (err, row) => {

	  if (err) {
		return console.error(err.message);
	  }

      res.send( 200, row );

	});

});

//UPDATE AN OPTION VALUE
app.route('/api/options').patch((req, res) => {

  let sql = `UPDATE OPTIONS
             SET option_value = ?
             WHERE option_name = ?`;
 
	db.run(sql, req.body, (err) => {

	  if (err) {
		return console.error(err.message);
	  }

      res.send( 200, req.body );

	});

});

//SELECT ALL TASKS
app.route('/api/search/').get((req, res) => {


  let sql = `SELECT * FROM TASK`;
 
	db.all(sql, [], (err, rows) => {

	  if (err) {
		return console.error(err.message);
	  }

      res.send( 200, rows );

	});

});
