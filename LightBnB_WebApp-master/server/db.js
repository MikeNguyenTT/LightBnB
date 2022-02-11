const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'test_db'
});

module.exports = {
  query: (text, params, singleRowOnly = false) => {
    const start = Date.now()
    return pool.query(text, params)
    .then(result => {
      const duration = Date.now() - start;
      console.log('executed query', { text, duration, rows: result.rowCount })
      console.log(result.rows);
      if (singleRowOnly && result.rows.length > 0) {
        return result.rows[0];
      } 
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
      return null;
    });
  },
}