import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(`unique-session-${Date.now()}`);
  const messagesEndRef = useRef(null);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/history/${sessionId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessage = { sender: 'user', text: input, timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newMessage]);
    setIsTyping(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/message`, {
        sessionId,
        message: input
      });
      let structuredReply = response.data.reply;
      if (structuredReply.split('\n').length > 1 || structuredReply.split('. ').length > 2) {
        structuredReply = structuredReply
          .split('\n')
          .map(line => line.trim())
          .filter(line => line)
          .join('\n- ');
      }
      structuredReply = structuredReply.replace(/\*\s*\*\*(.*?):\s*\*\*/g, '<strong>$1:</strong>')
                                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      setMessages(prev => [...prev, { sender: 'bot', text: structuredReply, timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { sender: 'bot', text: 'Error: Could not get response.', timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) }]);
    } finally {
      setIsTyping(false);
    }
    setInput('');
  };

  useEffect(() => {
    fetchHistory();
  }, [sessionId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="bg-[#F6F1E9] dark:bg-[#4F200D] rounded-lg shadow-lg h-full flex flex-col">
      <div className="p-4 border-b border-[#FF9A00] dark:border-[#FFD93D]">
        <h2 className="text-xl font-semibold text-[#4F200D] dark:text-[#FFD93D]">Chat Support</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`my-2 p-2 rounded-lg max-w-lg ${
              msg.sender === 'user'
                ? 'ml-auto bg-[#FF9A00] text-[#F6F1E9] dark:bg-[#FFD93D] dark:text-[#4F200D]'
                : 'bg-[#FFD93D] dark:bg-[#FF9A00] text-[#4F200D] dark:text-[#F6F1E9]'
            }`}
          >
            <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>').replace(/- /g, '<li>').replace(/\n- /g, '<br/><li>') }} />
            <span className="text-xs opacity-70 block mt-1">{msg.timestamp}</span>
          </div>
        ))}
        {isTyping && (
          <div className="my-2 p-2 bg-[#FFD93D] dark:bg-[#FF9A00] text-[#4F200D] dark:text-[#F6F1E9] rounded-lg max-w-lg">
            Agent is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-[#FF9A00] dark:border-[#FFD93D]">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 p-2 border border-[#FF9A00] rounded-l-lg dark:bg-[#4F200D] dark:border-[#FFD93D] focus:outline-none"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="bg-[#FF9A00] text-[#F6F1E9] p-2 rounded-r-lg hover:bg-[#FFD93D] focus:outline-none focus:ring-2 focus:ring-[#FF9A00]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;