const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    usersList: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  {
    versionKey: false
  }
);

schema.plugin(AutoIncrement, { inc_field: 'projectId' });

module.exports = model('Project', schema);
