// models/FollowTask.js
const mongoose = require('mongoose');

const followTaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  reward: { type: Number, required: true },
  platform: { type: String, required: true },
  accountLink: { type: String, required: true }
});

module.exports = mongoose.model('FollowTask', followTaskSchema);