const Faq = require('../models/Faq');
const pdfParse = require('pdf-parse');
const fs = require('fs').promises;
const { GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI } = require('@langchain/google-genai'); // Ensure correct import

const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
  model: 'embedding-001'
});

const chatModel = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: 'gemini-pro',
  temperature: 0.4
});

function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

async function askFaq(req, res) {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    // 1. Embed the question
    const questionVector = await embeddings.embedQuery(question);

    // 2. Fetch all stored FAQ chunks
    const allChunks = await Faq.find({}, { content: 1, embedding: 1 });

    // 3. Compute similarity for each chunk
    const scoredChunks = allChunks.map(chunk => {
      const similarity = cosineSimilarity(questionVector, chunk.embedding);
      return { content: chunk.content, similarity };
    });

    // 4. Sort by similarity and take top 3
    const topChunks = scoredChunks
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 3);

    const context = topChunks.map(c => c.content).join('\n---\n');

    const prompt = `
You are a helpful assistant answering based on FAQ documents.

Context:
${context}

Question:
${question}

Answer:
`;

    // 5. Generate answer using Gemini
    const response = await chatModel.invoke(prompt);
    res.json({ answer: response.text });
  } catch (err) {
    console.error('FAQ error:', err);
    res.status(500).json({ error: err.message });
  }
}


async function uploadFaq(req, res) {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const fileBuffer = req.file.buffer;
    const fileName = req.file.originalname;
    const mimeType = req.file.mimetype;

    let content = '';
    if (mimeType === 'application/pdf') {
      const pdfData = await pdfParse(fileBuffer);
      content = pdfData.text;
    } else if (mimeType === 'text/plain') {
      content = fileBuffer.toString('utf-8');
    } else {
      return res.status(400).json({ error: 'Unsupported file type. Use PDF or plain text.' });
    }

    const chunks = content.match(/.{1,500}/g) || [content];

    const faqDocs = [];
    for (const chunk of chunks) {
      console.log('Chunk:', chunk);
      const vector = await embeddings.embedQuery(chunk);
      console.log('Embedding:', vector);
      faqDocs.push({
        content: chunk,
        fileName: fileName,
        embedding: vector
      });
    }

    await Faq.insertMany(faqDocs);
    res.json({ message: 'FAQ uploaded and embedded successfully' });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = { uploadFaq, askFaq };