import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatInterface = ({ darkMode }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId] = useState(`session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const fetchHistory = async () => {
    try {
      setError(null);
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/history/${sessionId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
      setError('Failed to load chat history. Please refresh the page.');
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMessage = { 
      sender: 'user', 
      text: input.trim(), 
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setError(null);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/message`, {
        sessionId,
        message: input.trim()
      });
      
      let structuredReply = response.data.reply;
      // Format the response for better readability
      if (structuredReply) {
        structuredReply = structuredReply
          .replace(/\*\s*\*\*(.*?):\s*\*\*/g, '<strong>$1:</strong>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .split('\n')
          .map(line => line.trim())
          .filter(line => line)
          .join('\n');
      }
      
      const botMessage = { 
        sender: 'bot', 
        text: structuredReply, 
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) 
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        sender: 'bot', 
        text: 'Sorry, I encountered an error processing your request. Please try again.', 
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => [...prev, errorMessage]);
      setError('Connection error. Please check your internet connection.');
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [sessionId]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    // Focus input on load
    inputRef.current?.focus();
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg h-full flex flex-col border border-gray-200 dark:border-gray-700">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-messages">
        {messages.length === 0 && !isTyping ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
            <div className="bg-green-100 dark:bg-green-900/30 p-5 rounded-full mb-5">
              <span className="text-3xl">🤖</span>
            </div>
            <h3 className="text-xl font-medium mb-3 text-gray-700 dark:text-gray-300">How can I help you today?</h3>
            <p className="text-center max-w-md">Ask me anything about our company, products, or services.</p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <span className="font-medium">Examples:</span>
                <ul className="mt-1 space-y-1">
                  <li>• What services do you offer?</li>
                  <li>• How can I contact support?</li>
                  <li>• Tell me about your company</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex my-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} message-animate`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-4 rounded-2xl ${
                  msg.sender === 'user'
                    ? 'bg-green-500 text-white rounded-br-none'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                }`}
              >
                <div 
                  className="prose dark:prose-invert max-w-none break-words" 
                  dangerouslySetInnerHTML={{ 
                    __html: msg.text
                      .replace(/\n/g, '<br/>')
                      .replace(/^- /gm, '• ')
                  }} 
                />
                <span className={`text-xs opacity-70 block mt-2 ${msg.sender === 'user' ? 'text-green-100' : 'text-gray-500 dark:text-gray-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))
        )}
        
        {isTyping && (
          <div className="flex justify-start my-2 message-animate">
            <div className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-4 rounded-2xl rounded-bl-none max-w-xs md:max-w-md">
              <div className="flex items-center">
                <span className="mr-2">AI is thinking</span>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        {error && (
          <div className="mb-3 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}
        
        <div className="flex items-center">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50"
              placeholder="Type your message here..."
              disabled={isTyping}
              aria-label="Type your message"
            />
            {input && (
              <button
                onClick={() => setInput('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Clear message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white p-4 rounded-r-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center justify-center"
            aria-label="Send message"
          >
            {isTyping ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;