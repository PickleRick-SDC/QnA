const {Pool, Client} = require('pg')

const pool = new Pool({
user: "jonathanoh",
host: "localhost",
database: "qna",
password: "1234",
port: "5432"
});

pool.connect();


// QUERIES
const getQuestions = (request, response) => {
  pool.query('SELECT * FROM questions LIMIT 5', (error, res) => {
    if (error) {
      throw error
    }

    response.status(200).json(res.rows);
  })
}

const getAnswers = (req, res) => {
  const query = {
    text: `SELECT * FROM answers WHERE question_id = ${req.params.question_id}`
  }
  pool.query(query, (err, results) => {
    if (err) {
      console.log(err);
      // response.status(404).json(req);
      res.send('this is ' + req.params.question_id)
    }

    res.status(200).json(results.rows);
  })
}

const addQuestion = (req, res) => {
  const {body, name, email, product_id} = req.body;
  const query = {
    text: 'INSERT INTO answers (body, name, email, product_id) VALUES($1, $2, $3, $4) RETURNING *',
    values: [body, name, email, product_id]
  }
  pool.query(query, (err, results) => {
    if (err) {
      console.log(req)
    }
    // res.status(200).json(results);
    res.send('dkdk' + req.body)
  })
}

const addAnswer = (req, res) => {
  const query = {
    text: 'INSERT INTO answers (body, name, email, photos) VALUES($1, $2, $3, $4)',
    values: [body, name, email, photos]
  }
  pool.query(query, (err, res) => {
    if (err) {
      console.log(err.stack)
    }
    response.status(200).json(res.rows);
  })
}



module.exports = {
  pool,
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer
}

// module.export = pool;

