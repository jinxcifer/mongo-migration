import mongoose from 'mongoose';
import { database, up, down, status } from 'migrate-mongo'

let mongodb;

async function connect() {
  mongoose.connect('mongodb://localhost/migration');

  const connection = mongoose.connection;
  mongodb = await database.connect();

  connection.on('error', err => {
    console.log(`ERROR: ${err}`);
  });

  connection.once('open', () => {
    console.log(`CONNECTED TO MONGODB`);
  });

  migrateUp();
}

async function migrateUp() {
  const migrated = await up(mongodb);

  migrated.forEach(fileName => {
    console.log(`MIGRATED UP: ${fileName}`);
  });
}

async function migrateDown() {
  const migrated = await down(mongodb);

  migrated.forEach(fileName => {
    console.log(`MIGRATED DOWN: ${fileName}`);
  });
}

const db = {
  connect,
  migrateUp,
  migrateDown,
}

export default db;