const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use('/api', require('./src/routes'));

app.use(express.json({ extended: true }));

const PORT = config.get('port');

async function start() {
  try {
    await mongoose.connect(config.get('mongoUrl'), {});
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}`)
    );
  } catch (e) {
    console.log('Server Error', e.message);
    process.exit(1);
  }
}

start();
