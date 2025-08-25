<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Customer Support Chat Platform</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      font-family: 'Inter', sans-serif;
    }
    pre {
      background-color: #2d2d2d;
      color: #F6F1E9;
      padding: 1rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      font-family: 'Fira Code', monospace;
    }
    code {
      font-family: 'Fira Code', monospace;
    }
    .animate-pulse-slow {
      animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  </style>
</head>
<body class="bg-gradient-to-br from-[#F6F1E9] via-[#FFD93D] to-[#FF9A00] text-[#4F200D] min-h-screen">
  <div class="max-w-prose mx-auto p-6">
    <header class="mb-8">
      <h1 class="text-4xl font-bold text-[#4F200D] animate-pulse-slow">AI Customer Support Chat Platform</h1>
      <p class="mt-2 text-lg">
        A simplified AI-powered customer support chat application built with a React frontend, Node.js/Express backend, MongoDB database, and integrated with the Gemini AI API for contextual responses. The platform allows users to interact with a virtual assistant, supports FAQ/company data uploads for contextual answers, and stores conversation history.
      </p>
    </header>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-[#4F200D] mb-4">Features</h2>
      <div class="space-y-4">
        <div>
          <h3 class="text-xl font-medium text-[#FF9A00]">Chat Interface (Frontend)</h3>
          <ul class="list-disc list-inside text-[#4F200D]">
            <li>Responsive UI with chat bubbles for user and bot messages.</li>
            <li>Auto-scroll to the latest message.</li>
            <li>Dark/light mode toggle.</li>
            <li>Typing indicator for bot responses.</li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-medium text-[#FF9A00]">Backend APIs</h3>
          <ul class="list-disc list-inside text-[#4F200D]">
            <li>Endpoints for sending messages and retrieving chat history.</li>
            <li>Integration with Gemini AI for generating bot replies.</li>
            <li>FAQ upload endpoint to process PDF/text files.</li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-medium text-[#FF9A00]">AI Integration</h3>
          <ul class="list-disc list-inside text-[#4F200D]">
            <li>Uses Gemini AI (<code>gemini-1.5-flash</code>) for conversational responses.</li>
            <li>Embeddings-based similarity search (via LangChain) to prioritize FAQ context.</li>
            <li>System prompt ensures friendly, professional responses.</li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-medium text-[#FF9A00]">Database (MongoDB)</h3>
          <ul class="list-disc list-inside text-[#4F200D]">
            <li>Stores conversations (<code>sessionId</code>, messages, timestamps).</li>
            <li>Stores FAQ chunks with embeddings for contextual responses.</li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-medium text-[#FF9A00]">FAQ/Company Data Upload</h3>
          <ul class="list-disc list-inside text-[#4F200D]">
            <li>Admin interface to upload FAQs as PDF or text files.</li>
            <li>Processes uploaded files into text chunks with embeddings for similarity search.</li>
            <li>Answers user questions using FAQ context when relevant, falling back to general knowledge.</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-[#4F200D] mb-4">Tech Stack</h2>
      <ul class="list-disc list-inside text-[#4F200D]">
        <li><strong>Frontend:</strong> React, Tailwind CSS, Axios</li>
        <li><strong>Backend:</strong> Node.js, Express, MongoDB, Gemini AI API, LangChain</li>
        <li><strong>Database:</strong> MongoDB</li>
        <li><strong>File Processing:</strong> <code>pdf-parse</code> for PDFs, Formidable for file uploads</li>
        <li><strong>Deployment:</strong> Render (or any Node.js-compatible platform)</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-[#4F200D] mb-4">Prerequisites</h2>
      <ul class="list-disc list-inside text-[#4F200D]">
        <li><strong>Node.js:</strong> v16 or higher</li>
        <li><strong>MongoDB:</strong> Local instance or MongoDB Atlas</li>
        <li><strong>Gemini API Key:</strong> Obtain from Google Cloud Console</li>
        <li><strong>Git:</strong> For cloning the repository</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-[#4F200D] mb-4">Setup Instructions</h2>
      <div class="space-y-6">
        <div>
          <h3 class="text-xl font-medium text-[#FF9A00]">1. Clone the Repository</h3>
          <pre><code>git clone &lt;your-repo-url&gt;
cd ai-customer-support-chat</code></pre>
        </div>
        <div>
          <h3 class="text-xl font-medium text-[#FF9A00]">2. Backend Setup</h3>
          <p class="text-[#4F200D] mb-2">Navigate to the backend directory (if in a monorepo, e.g., <code>cd backend</code>).</p>
          <p class="text-[#4F200D] mb-2">Install dependencies:</p>
          <pre><code>npm install</code></pre>
          <p class="text-[#4F200D] mb-2">Create a <code>.env</code> file in the backend root with the following:</p>
          <pre><code>PORT=3000
MONGODB_URI=&lt;your-mongodb-connection-string&gt;
GEMINI_API_KEY=&lt;your-gemini-api-key&gt;</code></pre>
          <p class="text-[#4F200D] mb-2">
            Replace <code>&lt;your-mongodb-connection-string&gt;</code> with your MongoDB URI (e.g., <code>mongodb://localhost:27017/customer-support</code> or Atlas URI).<br>
            Replace <code>&lt;your-gemini-api-key&gt;</code> with your Gemini API key.
          </p>
          <p class="text-[#4F200D] mb-2">Start the backend server:</p>
          <pre><code>npm start</code></pre>
          <p class="text-[#4F200D]">The server will run on <code>http://localhost:3000</code> (or your specified <code>PORT</code>).</p>
        </div>
        <div>
          <h3 class="text-xl font-medium text-[#FF9A00]">3. Frontend Setup</h3>
          <p class="text-[#4F200D] mb-2">Navigate to the frontend directory (if in a monorepo, e.g., <code>cd frontend</code>).</p>
          <p class="text-[#4F200D] mb-2">Install dependencies:</p>
          <pre><code>npm install</code></pre>
          <p class="text-[#4F200D] mb-2">Create a <code>.env</code> file in the frontend root with:</p>
          <pre><code>VITE_BACKEND_URL=http://localhost:3000/api/chat</code></pre>
          <p class="text-[#4F200D] mb-2">Adjust the URL if your backend runs on a different port or host.</p>
          <p class="text-[#4F200D] mb-2">Start the frontend development server:</p>
          <pre><code>npm run dev</code></pre>
          <p class="text-[#4F200D]">The app will be available at <code>http://localhost:5173</code> (or as shown in the console).</p>
        </div>
        <div>
          <h3 class="text-xl font-medium text-[#FF9A00]">4. Testing the Application</h3>
          <div class="space-y-4">
            <div>
              <h4 class="text-lg font-medium text-[#FFD93D]">Chat Interface</h4>
              <ul class="list-disc list-inside text-[#4F200D]">
                <li>Open <code>http://localhost:5173</code> in your browser.</li>
                <li>Type a message in the chat input and press "Send" or Enter.</li>
                <li>Verify that the bot responds, with a typing indicator shown during processing.</li>
                <li>Check that conversation history is preserved (reload the page to test history retrieval).</li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-medium text-[#FFD93D]">Admin Upload</h4>
              <ul class="list-disc list-inside text-[#4F200D]">
                <li>Navigate to <code>/admin</code> in the app.</li>
                <li>Upload a <code>.txt</code> or <code>.pdf</code> file with FAQs (e.g., sample content provided in testing).</li>
                <li>Verify the "Uploading..." state on the button and success/failure alerts.</li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-medium text-[#FFD93D]">FAQ Contextual Responses</h4>
              <ul class="list-disc list-inside text-[#4F200D]">
                <li>Upload a sample FAQ file (e.g., with store hours or return policies).</li>
                <li>Ask questions in the chat interface that match the FAQ content.</li>
                <li>Confirm the bot uses FAQ context for relevant questions and falls back to general knowledge otherwise.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-[#4F200D] mb-4">Sample FAQ File</h2>
      <p class="text-[#4F200D] mb-2">Create a <code>.txt</code> or <code>.pdf</code> file with content like:</p>
      <pre><code>TechTrend Innovations FAQ
1. What are your store hours?
Our stores are open Monday to Friday, 9 AM to 6 PM, and Saturday, 10 AM to 4 PM. Closed on Sundays.
2. What is your return policy?
Returns are accepted within 30 days of purchase with a receipt. Items must be unused and in original packaging.</code></pre>
      <p class="text-[#4F200D]">Upload this via the <code>/admin</code> interface and test with questions like "What are your store hours?"</p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-[#4F200D] mb-4">Deployment on Render</h2>
      <div class="space-y-6">
        <div>
          <h3 class="text-xl font-medium text-[#FF9A00]">Push to GitHub</h3>
          <p class="text-[#4F200D] mb-2">Ensure your repository includes both frontend and backend (in separate folders if using a monorepo).</p>
          <p class="text-[#4F200D] mb-2">Commit and push all changes:</p>
          <pre><code>git add .
git commit -m "Prepare for Render deployment"
git push</code></pre>
        </div>
        <div>
          <h3 class="text-xl font-medium text-[#FF9A00]">Backend Deployment</h3>
          <ul class="list-disc list-inside text-[#4F200D] mb-2">
            <li>Create a new Web Service on Render.</li>
            <li>Connect your GitHub repository.</li>
            <li>Set the <strong>Root Directory</strong>:
              <ul class="list-circle list-inside ml-6">
                <li>Use <code>.</code> if <code>index.js</code> is in the repository root.</li>
                <li>Use <code>backend</code> if <code>index.js</code> is in a <code>backend/</code> folder.</li>
              </ul>
            </li>
            <li>Set <strong>Build Command</strong>: <code>npm install</code></li>
            <li>Set <strong>Start Command</strong>: <code>npm start</code></li>
            <li>Add environment variables in Render’s Environment settings:</li>
          </ul>
          <pre><code>PORT=5000
MONGODB_URI=&lt;your-mongodb-atlas-uri&gt;
GEMINI_API_KEY=&lt;your-gemini-api-key&gt;</code></pre>
          <p class="text-[#4F200D]">Deploy and check logs for <code>Backend running on port 5000</code>.</p>
        </div>
        <div>
          <h3 class="text-xl font-medium text-[#FF9A00]">Frontend Deployment</h3>
          <ul class="list-disc list-inside text-[#4F200D] mb-2">
            <li>Create another Web Service on Render.</li>
            <li>Connect the same repository.</li>
            <li>Set <strong>Root Directory</strong>: <code>frontend</code> (if applicable).</li>
            <li>Set <strong>Build Command</strong>: <code>npm install && npm run build</code></li>
            <li>Set <strong>Start Command</strong>: <code>npm run preview</code> (for Vite; adjust if using another setup).</li>
            <li>Add environment variable:</li>
          </ul>
          <pre><code>VITE_BACKEND_URL=&lt;your-render-backend-url&gt;/api/chat</code></pre>
          <p class="text-[#4F200D] mb-2">
            Replace <code>&lt;your-render-backend-url&gt;</code> with the Render URL for the backend service (e.g., <code>https://your-app.onrender.com</code>).
          </p>
          <p class="text-[#4F200D]">Deploy and access the app at the provided Render URL.</p>
        </div>
        <div>
          <h3 class="text-xl font-medium text-[#FF9A00]">Troubleshooting</h3>
          <ul class="list-disc list-inside text-[#4F200D]">
            <li>If you see <code>Error: Cannot find module '/opt/render/project/src/index.js'</code>:
              <ul class="list-circle list-inside ml-6">
                <li>Verify <code>index.js</code> exists in the specified Root Directory.</li>
                <li>Check case sensitivity (e.g., <code>index.js</code> vs. <code>Index.js</code>).</li>
                <li>Update the Start Command to match the file path (e.g., <code>node backend/index.js</code>).</li>
              </ul>
            </li>
            <li>Check Render logs for dependency or file path issues.</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-[#4F200D] mb-4">Project Structure</h2>
      <pre><code>ai-customer-support-chat/
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
├── README.md</code></pre>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-semibold text-[#4F200D] mb-4">Notes</h2>
      <ul class="list-disc list-inside text-[#4F200D]">
        <li><strong>Environment Variables:</strong> Keep <code>.env</code> files out of version control. Use Render’s Environment settings for deployment.</li>
        <li><strong>MongoDB:</strong> Use MongoDB Atlas for easy cloud setup. Ensure the IP whitelist includes Render’s servers (or use <code>0.0.0.0/0</code> for testing).</li>
        <li><strong>Gemini API:</strong> Ensure your API key has access to the <code>gemini-1.5-flash</code> model and embeddings.</li>
        <li><strong>Testing:</strong> Use the sample FAQ file and test questions from the project documentation to verify contextual responses.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-semibold text-[#4F200D] mb-4">Contributing</h2>
      <ul class="list-disc list-inside text-[#4F200D]">
        <li>Fork the repository.</li>
        <li>Create a feature branch (<code>git checkout -b feature-name</code>).</li>
        <li>Commit changes (<code>git commit -m "Add feature"</code>).</li>
        <li>Push to the branch (<code>git push origin feature-name</code>).</li>
        <li>Open a pull request.</li>
      </ul>
    </section>
  </div>
</body>
</html>
