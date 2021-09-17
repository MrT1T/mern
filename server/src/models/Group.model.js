const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    usersList: [{ type: String, ref: 'User' }]
  },
  {
    versionKey: false
  }
);

schema.plugin(AutoIncrement, { inc_field: 'groupId' });

module.exports = model('Group', schema);
