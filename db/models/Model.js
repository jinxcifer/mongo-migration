import mongoose from 'mongoose';

import trainSchema from '../schemas/Train';
import resultSchema from '../schemas/Result';

const modelSchema = new mongoose.Schema({
  name: String,
  type: String,
  train: trainSchema,
  result: resultSchema,
});

const Model = (mongoose.models.Model) ? mongoose.model('Model') : mongoose.model('Model', modelSchema);

export default Model;