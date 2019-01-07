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

app.listen(8000, () => {
  console.log('Server started!');
});
 
let db = new sqlite3.Database('./db/nova_list.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the nova-list database.');
});

// INSERT NEW TASK
app.route('/api/task').post((req, res) => {

  let sql = `INSERT INTO TASK(name, 
                              description, 
                              deadline_date, 
                              deadline_time, 
                              urgent, 
                              important, 
                              task_state) 
             VALUES(?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, req.body, function(err) {

    if (err) {
      return console.error(err.message);
    }

  });

  res.send( 201, req.body );

});

//SELECT ALL TASKS IN A SPECIFIED STATE
app.route('/api/board/:state').get((req, res) => {

  const STATE = req.params['state'];

  let sql = `SELECT * FROM TASK
             WHERE task_state = ?`;
 
	db.all(sql, [STATE], (err, rows) => {

	  if (err) {
		return console.error(err.message);
	  }

      res.send( 200, rows );

	});

});

//SELECT AN SPECIFIED TASK
app.route('/api/task-detail/:code').get((req, res) => {

  const CODE = req.params['code'];

  let sql = `SELECT * FROM TASK
             WHERE code = ?`;
 
	db.get(sql, [CODE], (err, row) => {

	  if (err) {
		return console.error(err.message);
	  }

      res.send( 200, row );

	});

});

//UPDATE STATE OF A TASK
app.route('/api/task-detail').patch((req, res) => {

  let sql = `UPDATE TASK
             SET task_state = ?
             WHERE code = ?`;
 
	db.run(sql, req.body, (err) => {

	  if (err) {
		return console.error(err.message);
	  }

      res.send( 200, req.body );

	});

});

//SELECT ALL ARCHIVED TASKS
app.route('/api/archive').get((req, res) => {

  let sql = `SELECT * FROM TASK
             WHERE task_state = ?`;
 
	db.all(sql, ['3'], (err, rows) => {

	  if (err) {
		return console.error(err.message);
	  }

      res.send( 200, rows );

	});

});

//DELETE AN ARCHIVED TASK
app.route('/api/archive/:code').delete((req, res) => {

  const CODE = req.params['code'];

  let sql = `DELETE FROM TASK
             WHERE code = ?`;
 
	db.run(sql, [CODE], (err) => {

	  if (err) {
		return console.error(err.message);
	  }

      res.sendStatus(204);

	});

});