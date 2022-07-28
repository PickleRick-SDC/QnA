import mongoose from 'mongoose'
const { Schema } = mongoose;

const questionsSchema = new Schema({
  id: Number,
  body: String,
  date: Number,
  asker_name: String,
  helpfulness: Number,
  reported: Boolean,
  product_id: Number,
  answers: [{ type: Schema.Types.ObjectId, ref: 'answers'}]
})

const answersSchema = new Schema ({
  id: Number,
  body: String,
  date: Number,
  answerer_name: String,
  helpfulness: Number,
  questions_id: [{type: Schema.Types.ObjectId, ref: 'questions'}],
  photos: [
    {
      id: Number,
      url: String
    }
  ]
})

const answers = mongoose.model('answers', answersSchema);
const questions = mongoose.model('questions', questionsSchema);