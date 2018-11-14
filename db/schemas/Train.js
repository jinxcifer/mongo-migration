import mongoose from 'mongoose'

const trainSchema = new mongoose.Schema({
  _id: false,
  psi: Number,
});

export default trainSchema;