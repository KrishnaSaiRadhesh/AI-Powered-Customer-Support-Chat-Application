const Conversation = require('../models/Conversation');
const Faq = require('../models/Faq');
const { getBotResponse } = require('../services/aiService');

async function getHistory(req, res) {
  const { sessionId } = req.params;
  try {
    const convo = await Conversation.findOne({ sessionId });
    res.json(convo ? convo.messages : []);
  } catch (error) {
    console.error(`Error fetching history for session ${sessionId}:`, error.message);
    res.status(500).json({ error: `Failed to fetch history: ${error.message}` });
  }
}

async function sendMessage(req, res) {
  const { sessionId, message } = req.body;
  try {
    let convo = await Conversation.findOne({ sessionId });
    if (!convo) {
      convo = new Conversation({ sessionId, messages: [] });
    } else {
      console.log(`Existing conversation found for session ${sessionId}, messages count: ${convo.messages.length}`);
    }

    convo.messages.push({ sender: 'user', text: message, timestamp: new Date() });

    const faqs = await Faq.find({}, 'content embedding');
    console.log(`FAQs fetched for session ${sessionId}:`, faqs.length, faqs.map(f => f.content.substring(0, 50)));

    const botReply = await getBotResponse(message, convo.messages, faqs);
    convo.messages.push({ sender: 'bot', text: botReply, timestamp: new Date() });

    await convo.save();
    res.json({ reply: botReply });
  } catch (err) {
    console.error(`Error processing message for session ${sessionId}:`, err.message);
    res.status(500).json({ error: `Failed to process message: ${err.message}` });
  }
}

module.exports = { getHistory, sendMessage };