const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const apiRouter = require('./src/routers');
// const initial = require('./src/data');

const app = express();
app.use(express.json());

app.use('/api', apiRouter());

app.use((req, res) => {
  res.status(404).send('PAGE NOT FOUND');
});

const PORT = config.get('port');

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUrl'));
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}`)
    );
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
};

start();
// initial();
