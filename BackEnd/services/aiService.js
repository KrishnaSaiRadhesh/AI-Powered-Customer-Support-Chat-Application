require("dotenv").config();

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
  model: 'embedding-001'
});


function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

async function getBotResponse(userMessage, conversationHistory, faqContent) {

  const questionVector = await embeddings.embedQuery(userMessage);

 
  const allChunks = faqContent;


  const scoredChunks = allChunks.map(chunk => {
    const similarity = cosineSimilarity(questionVector, chunk.embedding);
    return { content: chunk.content, similarity };
  });


  const topChunks = scoredChunks
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);

  const context = topChunks.map(c => c.content).join('\n---\n');


  const systemPrompt = `
You are a friendly and professional AI customer support agent available 24/7 to assist users with any question or issue. Your goal is to provide helpful, accurate, and clear responses. Always prioritize the provided FAQ context if it's relevant to the user's question. Use the conversation history to provide context-aware replies.

Guidelines:
- Use the provided FAQ context to answer if the question matches it.
- If the context doesn't cover the question, use general knowledge or admit limitations.
- If you don’t know the answer, say: 'I’m sorry, I don’t have enough information to answer that. Please provide more details or contact a human agent for assistance.'
- For complex issues, suggest: 'This might require further assistance. Please reach out to our support team for help.'
- Keep responses concise yet informative, avoiding unnecessary jargon.
- Never claim to be a specific company unless provided in the context; remain neutral.
  `;

  // Format history for Gemini
  const history = conversationHistory.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    systemInstruction: systemPrompt
  });

  const chat = model.startChat({
    history: history,
    generationConfig: { maxOutputTokens: 500 }
  });


  const fullPrompt = `
FAQ Context (use if relevant):
${context ? context : 'No specific FAQ context available.'}

User Message:
${userMessage}
  `;

  const result = await chat.sendMessage(fullPrompt);
  return result.response.text();
}

module.exports = { getBotResponse };