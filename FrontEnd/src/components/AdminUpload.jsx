import React, { useState } from 'react';
import axios from 'axios';

const AdminUpload = () => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    setIsLoading(true); 
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/upload-faq`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('FAQ uploaded successfully');
      setFile(null); 
    } catch (err) {
      console.error('Upload error:', err);
      alert('Upload failed. Check console for details.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#F6F1E9] via-[#FFD93D] to-[#FF9A00] dark:from-[#4F200D] dark:via-[#4F200D] dark:to-[#4F200D] rounded-lg shadow-lg max-w-md mx-auto p-6 transition-all duration-500 border border-[#FF9A00] dark:border-[#FFD93D] animate-gradient">
      <h2 className="text-2xl font-semibold mb-4 text-[#4F200D] dark:text-[#FFD93D] animate-pulse">Admin: Upload FAQs/Document</h2>
      <div className="space-y-4">
        <input
          type="file"
          accept=".txt,.pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-[#4F200D] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-[#F6F1E9] file:text-[#4F200D] hover:file:bg-[#FFD93D] dark:file:bg-[#4F200D] dark:file:text-[#F6F1E9] transition-all duration-300 hover:scale-105"
        />
        <button
          onClick={handleUpload}
          className={`w-full p-2 rounded-lg text-[#F6F1E9] transition-all duration-300 ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-[#FF9A00] hover:bg-[#FFD93D] focus:outline-none focus:ring-2 focus:ring-[#FF9A00] animate-pulse-slow hover:scale-105'
          }`}
          disabled={!file || isLoading} 
        >
          {isLoading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
    </div>
  );
};

export default AdminUpload;