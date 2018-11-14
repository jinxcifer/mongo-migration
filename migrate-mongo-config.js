module.exports = {
  mongodb: {
    url: "mongodb://localhost:27017",
    databaseName: "migration",

    options: {
      useNewUrlParser: true,
    }
  },
  // migration 페일들이 저장되어있는 폴더 이름
  migrationsDir: "migrations",
  // 무슨 migration 벌써 적용되어있는지 안 되어있는지 저장하는 데이터베이스 모델 이름
  changelogCollectionName: "changelog",
};
