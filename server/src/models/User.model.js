const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    groupsList: [{ type: String, ref: 'Group' }]
  },
  {
    versionKey: false
  }
);

schema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = model('User', schema);
