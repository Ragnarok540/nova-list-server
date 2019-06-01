const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./db/nova_list.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Connected to the nova-list database.');
  }
});

module.exports = { 
  db
};
