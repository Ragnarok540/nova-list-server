const { db } = require('helpers/database');

module.exports = { 
  create,
  read,
  readState,
  update,
  updateState,
  deleteTask
};

function create(req, res) {
  const sql = `INSERT 
               INTO TASK (name, 
                          description, 
                          deadline_date, 
                          deadline_time, 
                          urgent, 
                          important, 
                          task_state) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.run(sql, [req.body.name,
               req.body.description,
               req.body.deadline_date,
               req.body.deadline_time,
               req.body.urgent,
               req.body.important,
               "0"], function(err) {
    if (err) {
      return console.error(err.message);
    }
  });

  res.status(201).send(req.body);
}

function read(req, res) {
  const CODE = req.params['code'];

  const sql = `SELECT * 
                 FROM TASK
                WHERE code = ?`;
 
  db.get(sql, [CODE], (err, row) => {

    if (err) {
      return console.error(err.message);
    }

    res.status(200).send(row);

  });
}

function readState(req, res) {
  const STATE = req.params['state'];

  const sql = `SELECT *
                 FROM TASK
                WHERE task_state = ?`;

  db.all(sql, [STATE], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }

    res.status(200).send(rows);
  });
}

function update(req, res) {
  const sql = `UPDATE TASK
                  SET name = ?, 
                      description = ?, 
                      deadline_date = ?, 
                      deadline_time = ?, 
                      urgent = ?, 
                      important = ?
                WHERE code = ?`;
  
  db.run(sql, [req.body.name,
               req.body.description,
               req.body.deadline_date,
               req.body.deadline_time,
               req.body.urgent,
               req.body.important,
               req.body.code], (err) => {
    if (err) {
      return console.error(err.message);
    }

    res.status(200).send(req.body);
  });
}

function updateState(req, res) {
  const sql = `UPDATE TASK
                  SET task_state = ?
                WHERE code = ?`;
 
  db.run(sql, [req.body.task_state, 
               req.body.code], (err) => {
    if (err) {
      return console.error(err.message);
    }

    res.status(200).send(req.body);
  });
}

function deleteTask(req, res) {
  const CODE = req.params['code'];

  const sql = `DELETE 
                 FROM TASK
                WHERE code = ?`;
 
  db.run(sql, [CODE], (err) => {
    if (err) {
      return console.error(err.message);
    }

    res.status(204).send({"message":"task deleted"});
  });
}
