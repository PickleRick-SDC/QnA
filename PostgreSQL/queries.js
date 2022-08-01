const db = require('./db.js');

const getQuestions = (request, response) => {
  db.pool.query('SELECT * FROM questions LIMIT 5', (error, results) => {
    if (error) {
      throw error
    }

    response.status(200).json(results.rows);
  })
}


module.exports = {
  getQuestions
}