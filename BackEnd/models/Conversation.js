const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender: {type:String, enum: ['user', 'bot']},
    text: {type: String},
    timestamp: {type: Date, default:Date.now}
})

const conversationSchema = new mongoose.Schema({
    sessionId : {type: String, required: true},
    messages: [messageSchema],
    timestamp: {type: Date, default: Date.now}
})

module.exports = mongoose.model('Conversation', conversationSchema);

