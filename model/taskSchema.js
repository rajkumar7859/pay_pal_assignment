const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['bug', 'feature', 'story'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  assignee: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['to do', 'in progress', 'done'],
    required: true
  }
});
const Task = mongoose.model('Task', taskSchema);
module.exports = Task
