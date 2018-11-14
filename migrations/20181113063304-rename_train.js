module.exports = {
  async up(db) {
    const Model = db.collection('models');
    const condition = { train: { $exists: true }, test: { $exists: false } };

    await Model.updateMany(condition, { $rename: { 'train': 'test'} });
  },

  async down(db) {
    const Model = db.collection('models');
    const condition = { train: { $exists: false }, test: { $exists: true } };

    await Model.updateMany(condition, { $rename: { 'test': 'train'} });
  }
};
