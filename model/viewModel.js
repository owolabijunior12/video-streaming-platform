const mongoose = require('mongoose');

const viewSchema = new mongoose.Schema({
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Video', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const View = mongoose.model('View', viewSchema);

module.exports = View;
