<h1>AI Customer Support Chat Platform</h1>
A simplified AI-powered customer support chat application built with a React frontend, Node.js/Express backend, MongoDB database, and integrated with the Gemini AI API for contextual responses. The platform allows users to interact with a virtual assistant, supports FAQ/company data uploads for contextual answers, and stores conversation history.
Features

Chat Interface (Frontend):
Responsive UI with chat bubbles for user and bot messages.
Auto-scroll to the latest message.
Dark/light mode toggle.
Typing indicator for bot responses.


Backend APIs:
Endpoints for sending messages and retrieving chat history.
Integration with Gemini AI for generating bot replies.
FAQ upload endpoint to process PDF/text files.


AI Integration:
Uses Gemini AI (gemini-1.5-flash) for conversational responses.
Embeddings-based similarity search (via LangChain) to prioritize FAQ context.
System prompt ensures friendly, professional responses.


Database (MongoDB):
Stores conversations (sessionId, messages, timestamps).
Stores FAQ chunks with embeddings for contextual responses.


FAQ/Company Data Upload:
Admin interface to upload FAQs as PDF or text files.
Processes uploaded files into text chunks with embeddings for similarity search.
Answers user questions using FAQ context when relevant, falling back to general knowledge.



Tech Stack

Frontend: React, Tailwind CSS, Axios
Backend: Node.js, Express, MongoDB, Gemini AI API, LangChain
Database: MongoDB
File Processing: pdf-parse for PDFs, Formidable for file uploads
Deployment: Render (or any Node.js-compatible platform)

Prerequisites

Node.js: v16 or higher
MongoDB: Local instance or MongoDB Atlas
Gemini API Key: Obtain from Google Cloud Console
Git: For cloning the repository

Setup Instructions
1. Clone the Repository
git clone <your-repo-url>
cd ai-customer-support-chat

2. Backend Setup

Navigate to the backend directory (if in a monorepo, e.g., cd backend).

Install dependencies:
npm install


Create a .env file in the backend root with the following:
PORT=3000
MONGODB_URI=<your-mongodb-connection-string>
GEMINI_API_KEY=<your-gemini-api-key>


Replace <your-mongodb-connection-string> with your MongoDB URI (e.g., mongodb://localhost:27017/customer-support or Atlas URI).
Replace <your-gemini-api-key> with your Gemini API key.


Start the backend server:
npm start

The server will run on http://localhost:3000 (or your specified PORT).


3. Frontend Setup

Navigate to the frontend directory (if in a monorepo, e.g., cd frontend).

Install dependencies:
npm install


Create a .env file in the frontend root with:
VITE_BACKEND_URL=http://localhost:3000/api/chat


Adjust the URL if your backend runs on a different port or host.


Start the frontend development server:
npm run dev

The app will be available at http://localhost:5173 (or as shown in the console).


4. Testing the Application

Chat Interface:
Open http://localhost:5173 in your browser.
Type a message in the chat input and press "Send" or Enter.
Verify that the bot responds, with a typing indicator shown during processing.
Check that conversation history is preserved (reload the page to test history retrieval).


Admin Upload:
Navigate to /admin in the app.
Upload a .txt or .pdf file with FAQs (e.g., sample content provided in testing).
Verify the "Uploading..." state on the button and success/failure alerts.


FAQ Contextual Responses:
Upload a sample FAQ file (e.g., with store hours or return policies).
Ask questions in the chat interface that match the FAQ content.
Confirm the bot uses FAQ context for relevant questions and falls back to general knowledge otherwise.



Sample FAQ File
Create a .txt or .pdf file with content like:
TechTrend Innovations FAQ
1. What are your store hours?
Our stores are open Monday to Friday, 9 AM to 6 PM, and Saturday, 10 AM to 4 PM. Closed on Sundays.
2. What is your return policy?
Returns are accepted within 30 days of purchase with a receipt. Items must be unused and in original packaging.

Upload this via the /admin interface and test with questions like "What are your store hours?"
Deployment on Render

Push to GitHub:

Ensure your repository includes both frontend and backend (in separate folders if using a monorepo).

Commit and push all changes:
git add .
git commit -m "Prepare for Render deployment"
git push




Backend Deployment:

-> Create a new Web Service on Render.

-> Connect your GitHub repository.

-> Set the Root Directory:

-> Use . if index.js is in the repository root.
-> Use backend if index.js is in a backend/ folder.


-> Set Build Command: npm install

-> Set Start Command: npm start

Add environment variables in Render’s Environment settings:
-> PORT=5000
-> MONGODB_URI=<your-mongodb-atlas-uri>
-> GEMINI_API_KEY=<your-gemini-api-key>


Deploy and check logs for Backend running on port 3000.


Frontend Deployment:

-> Create another Web Service on Render.

-> Connect the same repository.

-> Set Root Directory: frontend (if applicable).

-> Set Build Command: npm install && npm run build

-> Set Start Command: npm run preview (for Vite; adjust if using another setup).

Add environment variable:
-> VITE_BACKEND_URL=<your-render-backend-url>/api/chat

-> Replace <your-render-backend-url> with the Render URL for the backend service (e.g., https://your-app.onrender.com).
-> Deploy and access the app at the provided Render URL.



Troubleshooting:

If you see Error: Cannot find module '/opt/render/project/src/index.js':
Verify index.js exists in the specified Root Directory.
Check case sensitivity (e.g., index.js vs. Index.js).
Update the Start Command to match the file path (e.g., node backend/index.js).


Check Render logs for dependency or file path issues.



Project Structure:
<p>
ai-customer-support-chat/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   ├── cloudinary.js
│   ├── controllers/
│   │   ├── chatController.js
│   │   ├── faqController.js
│   ├── models/
│   │   ├── Conversation.js
│   │   ├── Faq.js
│   ├── routes/
│   │   ├── chatRoutes.js
│   ├── services/
│   │   ├── aiService.js
│   ├── index.js
│   ├── package.json
│   ├── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatInterface.jsx
│   │   │   ├── AdminUpload.jsx
│   │   ├── App.jsx
│   ├── package.json
│   ├── .env
├── README.md
</p>

Notes

Environment Variables: Keep .env files out of version control. Use Render’s Environment settings for deployment.
MongoDB: Use MongoDB Atlas for easy cloud setup. Ensure the IP whitelist includes Render’s servers (or use 0.0.0.0/0 for testing).
Gemini API: Ensure your API key has access to the gemini-1.5-flash model and embeddings.
Testing: Use the sample FAQ file and test questions from the project documentation to verify contextual responses.

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature-name).
Commit changes (git commit -m "Add feature").
Push to the branch (git push origin feature-name).
Open a pull request.

Can you neatly style this readme file with html tags
