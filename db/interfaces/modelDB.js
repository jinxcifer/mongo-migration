import Model from '../models/Model';

async function getById(id) {
  try {
    const result = await Model.findById(id);

    return result;
  } catch(err) {
    console.log(err);
  }
}

async function getAll() {
  try {
    const result = await Model.find({});

    return result
  } catch(err) {
    console.log(err);
  }
}

async function create(props) {
  try {
    const result = await Model.create(props);

    return result;
  } catch(err) {
    console.log(err);
  }
}

async function deleteById(id) {
  try {
    const result = Model.deleteOne({
      _id: id,
    });

    return result;
  } catch(err) {
    console.log(err);
  }
}

async function deleteAll() {
  try {
    const result = Model.deleteMany({});

    return result;
  } catch(err) {
    console.log(err);
  }
}

const modelDB = {
  getById,
  getAll,
  create,
  deleteById,
  deleteAll,
}

export default modelDB;