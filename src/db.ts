export {};
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const buildSchemas = require('./schemas.ts');

db.serialize(() => {
  buildSchemas(db);
});

db.query = function(sql, params) {
  const that = this;
  return new Promise(function(resolve, reject) {
    that.all(sql, params, function(error, rows) {
      if (error) {
        reject(error);
      } else {
        resolve({rows: rows});
      }
    });
  });
};

module.exports = db;
