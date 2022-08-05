const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const queries = require('../PostgreSQL/queries.js');
const db = require('../PostgreSQL/db.js');
require('dotenv').config();

// define the Express app
const app = express();
const port = process.env.PORT;

// using the bodyParser to parse Json bodies into JS objects
app.use(express.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// )

// enable CORS for all requests
// app.use(cors());

// defining an endpoint to return all

app.get('/loaderio-34826b5e8ce9b1bde360b137a0c28938', (req, res) =>
        res.send('loaderio-34826b5e8ce9b1bde360b137a0c28938'));

// LIST QUESTIONS
// app.get('/qa/questions/:product_id/:page?/:count?', db.getQuestions)
app.get('/qa/questions/', db.getQuestions)
// ANSWERS LIST
app.get('/qa/questions/:question_id/answers', db.getAnswers)
// ADD A QUESTION - TODO
app.post('/qa/questions', db.addQuestion)
// ADD AN ANSWER - TODO
app.post(`/qa/questions/:question_id/answers`, db.addAnswer)
// MARK QUESTION AS HELPFUL
app.put(`/qa/questions/:question_id/helpful`, db.updateHelpful)
// // REPORT A QUESTION -
app.put(`/qa/questions/:question_id/report`, db.updateReported)
// // MARK ANSWER AS HELPFUL
app.put(`/qa/answers/:answer_id/helpful`, db.updateAnswerHelpful)
// REPORT ANSWER
app.put(`/qa/answers/:answer_id/report`, db.updateAnswerReported)


app.listen(port, () => {
  console.log(`listening on port ${port}`);
})