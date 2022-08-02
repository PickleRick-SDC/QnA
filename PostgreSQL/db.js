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

  // pool.query(
  //   `SELECT * FROM questions
  //  LIMIT 5`)
  //   .this(({rows}) => {
  //     response.status(200).json(rows);
  //   })
  //   .catch((err) =>
  //   {
  //     response.status(400).send(err);
  //   })

  const query = {
    text: `SELECT
    product_id,
    (
      SELECT json_agg(json_build_object(
      'question_id', q.id,
      'question_body', q.body,
      'question_date', q.date,
      'asker_name', q.asker_name,
      'asker_email', q.asker_email,
      'reported', q.reported,
      'answers', (
                    SELECT json_object_agg(
                      a.id, json_build_object(
                        'id', a.id,
                        'body', a.body,
                        'date', a.date,
                        'answerer_name', a.answerer_name,
                        'helpfulness', a.helpful,
                        'photos', (
                          SELECT json_agg(json_build_object(
                            'id', ph.id,
                            'url', ph.url
                          ))
                          FROM photos ph
                          WHERE ph.answer_id = a.id
                        )
                      )
                    )
                    FROM answers a
                    WHERE a.question_id = q.id
                  )
      ))
      AS results
      FROM questions q
      WHERE id = 1
    )
    FROM questions
    WHERE id = 1`
  }

  pool.query(query, (error, res) => {
    if (error) {
      throw error
    }

    response.status(200).json(res.rows);
    pool.end();
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

const updateHelpful = (req, res) => {


  const query = {
    text: 'UPDATE questions SET helpful = helpful + 1 WHERE id = $1',
    values: [req.params.question_id]
  }

  pool.query(query)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.log(err.stack);
      res.status(400).send();
    })
}

const updateReported = (req, res) => {

  const query = {
    text: 'UPDATE questions SET reported = NOT reported WHERE id = $1',
    values: [req.params.question_id]
  }

  pool.query(query)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.log(err.stack);
      res.status(400).send();
    })
}

const updateAnswerHelpful = (req, res) => {

  const query = {
    text: 'UPDATE answers SET helpful = helpful + 1 WHERE id = $1',
    values: [req.params.answer_id]
  }

  pool.query(query)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.log(err.stack);
      res.status(400).send();
    })
}

const updateAnswerReported = (req, res) => {

  const query = {
    text: 'UPDATE answers SET reported = NOT reported WHERE id = $1',
    values: [req.params.answer_id]
  }

  pool.query(query)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.log(err.stack);
      res.status(400).send();
    })
}

module.exports = {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer,
  updateHelpful,
  updateReported,
  updateAnswerHelpful,
  updateAnswerReported
}

// module.export = pool;

