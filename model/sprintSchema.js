const mongoose = require('mongoose');

const sprintSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    default: Date.now,
  },
});
const Sprint =mongoose.model('Sprint', sprintSchema);
module.exports = Sprint