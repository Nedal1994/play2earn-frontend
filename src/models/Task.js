const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  reward: { type: Number, required: true },
  category: { type: String, required: true },
  isFollowTask: { type: Boolean, default: false },
  platform: { type: String },
  accountLink: { type: String }
});

module.exports = mongoose.model('Task', taskSchema);
