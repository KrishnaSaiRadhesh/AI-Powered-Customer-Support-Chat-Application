import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import AdminUpload from './components/AdminUpload';
import './index.css'

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <div className="flex h-screen bg-gradient-to-br from-[#F6F1E9] via-[#FFD93D] to-[#FF9A00] dark:from-[#4F200D] dark:via-[#4F200D] dark:to-[#4F200D] text-[#4F200D] dark:text-[#F6F1E9] transition-all duration-500 animate-gradient">
          {/* Sidebar */}
          <aside className="w-64 bg-gradient-to-b from-[#FF9A00] to-[#4F200D] px-4 py-4 text-[#F6F1E9] transition-all duration-300 hover:bg-opacity-90">
            <h2 className="text-xl font-bold mb-2 text-[#FFD93D] animate-pulse">AI Customer Support</h2>
            <nav className='py-4'>
              <Link to="/" className="block py-2 px-4 hover:bg-[#FF9A00] rounded transition-all duration-300 hover:scale-105">Chat</Link>
              <Link to="/admin" className="block py-3 px-4 hover:bg-[#FF9A00] rounded transition-all duration-300 hover:scale-105">Admin Upload</Link>
            </nav>
            {/* <button
              onClick={() => setDarkMode(!darkMode)}
              className="mt-auto w-full py-2 bg-[#FFD93D] dark:bg-[#FF9A00] text-[#4F200D] dark:text-[#F6F1E9] rounded hover:bg-[#FF9A00] dark:hover:bg-[#FFD93D] transition-all duration-300 animate-pulse-slow"
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </button> */}
          </aside>

         
          <main className="flex-1 p-6 overflow-auto bg-gradient-to-br from-[#F6F1E9] via-[#FFD93D] to-[#FF9A00] dark:from-[#4F200D] dark:via-[#4F200D] dark:to-[#4F200D] transition-all duration-500">
            <Routes>
              <Route path="/" element={<ChatInterface />} />
              <Route path="/admin" element={<AdminUpload />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;