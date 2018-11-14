import mongoose from 'mongoose'

const resultSchema = new mongoose.Schema({
  _id: false,
  gini: Number,
  accuracy: Number,
});

export default resultSchema;