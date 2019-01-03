const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(bodyParser.json());

app.listen(8000, () => {
  console.log('Server started!');
});
 
let db = new sqlite3.Database('./db/nova_list.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the nova-list database.');
});

app.route('/api/cats').get((req, res) => {
  res.send({
    cats: [{ name: 'lilly' }, { name: 'lucy' }]
  });
});

app.route('/api/cats').post((req, res) => {

  console.log(req.body);

  db.run('INSERT INTO TASK(NAME, DESCRIP, DEADLINEDATE, DEADLINETIME, URGENT, IMPORTANT, TSTATE) VALUES(?, ?, ?, ?, ?, ?, ?)', req.body, function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });

  res.send(201, req.body);
});