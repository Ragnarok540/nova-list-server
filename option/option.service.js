const { db } = require('helpers/database');

module.exports = { 
  read,
  updateValue
};

function read(req, res) {
  const NAME = req.params['name'];

  const sql = `SELECT *
                 FROM OPTIONS
                WHERE option_name = ?`;
 
  db.get(sql, [NAME], (err, row) => {
    if (err) {
      return console.error(err.message);
    }

    res.status(200).send(row);
  });
}

function updateValue(req, res) {
  const sql = `UPDATE OPTIONS
                  SET option_value = ?
                WHERE option_name = ?`;
 
  db.run(sql, [req.body.option_value, 
               req.body.option_name], (err) => {
    if (err) {
      return console.error(err.message);
    }

    res.status(200).send(req.body);
  });
}
