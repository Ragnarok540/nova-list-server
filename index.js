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

  console.log(req.body);

  db.run(`INSERT INTO TASK(NAME, DESCRIP, DEADLINEDATE, DEADLINETIME, URGENT, IMPORTANT, TSTATE) 
          VALUES(?, ?, ?, ?, ?, ?, ?)`, req.body, function(err) {

    if (err) {
      return console.error(err.message);
    }

  });

  res.send(201, req.body);

});

//SELECT ALL TASKS IN A SPECIFIED STATE
app.route('/api/board/:state').get((req, res) => {

  const STATE = req.params['state'];

  let sql = `SELECT * FROM TASK
             WHERE TSTATE = ?`;
 
	db.all(sql, [STATE], (err, rows) => {

	  if (err) {
		return console.error(err.message);
	  }

      res.send( 200, rows );

	});

});

