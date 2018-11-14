import express from 'express';

import db from './db'
import modelDB from './db/interfaces/modelDB'

// CREATE SERVER
const app = express();

app.use(express.json());

// CONNECT DATABASE
db.connect().then(() => {
  // DEFINE ROUTES
  app.get('/', (req, res) => {
    res.send('Hello World');
  });

  app.get('/models/:id', async (req, res) => {
    const model = await modelDB.getById(req.params.id);

    res.send(model);
  });

  app.get('/models/', async (req, res) => {
    const models = await modelDB.getAll();

    res.send(models);
  });

  app.post('/models/', async (req, res) => {
    const model = await modelDB.create(req.body);

    res.send(model);
  });

  app.delete('/models/:id', async (req, res) => {
    const model = await modelDB.deleteById(req.params.id);

    res.send(model);
  });

  app.delete('/models/', async (req, res) => {
    const models = await modelDB.deleteAll();

    res.send(models);
  });

  app.post('/migrations/up', async (req, res) => {
    await db.migrateUp();
    res.send('OK');
  });

  app.post('/migrations/down', async (req, res) => {
    await db.migrateDown();
    res.send('OK');
  });

  app.listen(3000, () => {
    console.log('listening on 3000');
  });
}).catch(err => {
  console.log(err);
});