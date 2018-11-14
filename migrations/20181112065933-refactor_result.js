import _ from 'lodash';

// schema로 만든 model 쓰면 안 됩니다. model 쓴다면 새로 추가하려는 속성과 지우려는 속성을 schema에 추가해야니까 schema가 복잡할 거예요.
// import Model from '../db/models/Model';

// migrate-mongo 패키지가 mongoose 말고 mongodb 패키지를 쓰어서 mongodb 설명서를 참고해야합니다.
// http://mongodb.github.io/node-mongodb-native/3.1/tutorials/crud/

module.exports = {
  async up(db) {
    const Model = db.collection('models');
    const condition = { result: { $exists: true }, train: { $exists: true } };

    const models = await Model.find(condition).toArray();
    const newModels = [];

    if(models.length > 0) {
      // 이전 데이터를 덮어쓰지 않도록 데이터를 복사하고 저장합니다.
      _.forEach(models, model => {
        const newModel = model;

        newModel.train = Object.assign(newModel.train, newModel.result);
        delete newModel._id;
        delete newModel.result;

        newModels.push(newModel);
      });

      // 에러가 생기면 에러가 생일때까지 처리된 데이터베이스 작업들을 롤백해야합니다.
      try {
        await Model.insertMany(newModels);
        // 복사된 데이터 저장이 잘 되어야 이전 데이터를 지워도 됩니다.
        await Model.deleteMany(condition);
      } catch (err) {
        console.log(err);
      }
    }
  },

  async down(db) {
    const Model = db.collection('models');
    const condition = { result: { $exists: false }, train: { $exists: true }  };

    const models = await Model.find(condition).toArray();
    const newModels = [];

    if(models.length > 0) {
      _.forEach(models, model => {
        const newModel = model;

        newModel.result = newModel.train;
        delete newModel._id;
        delete newModel.train;

        newModels.push(newModel);
      });

      try {
        await Model.insertMany(newModels);
        await Model.deleteMany(condition);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
