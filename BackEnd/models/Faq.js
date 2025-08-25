const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  content: { type: String, required: true },  // Text chunk
  fileName: { type: String, required: true }, // Original file name
  embedding: { type: [Number], required: true }, // Embedding vector
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Faq', faqSchema);