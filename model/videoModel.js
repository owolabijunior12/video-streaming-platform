const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  tags: [{ type: String }],
  url: { type: String, required: true },
  thumbnail: { type: String },
  duration: { type: Number, required: true },
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
