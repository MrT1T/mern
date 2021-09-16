const { Schema, model } = require('mongoose');

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

module.exports = model('User', schema);
