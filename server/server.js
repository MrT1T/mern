const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRouter = require('./src/routers');
const {
  errorsHandler,
  noPageError
} = require('./src/middlewares/erorrs.middleware');
// const initial = require('./src/fixtures');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
};

const app = express();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter());

app.use(errorsHandler);

app.use(noPageError);

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
