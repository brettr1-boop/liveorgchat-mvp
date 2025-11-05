import React, { useState } from 'react';
import axios from 'axios';

export default function PostAnnouncement({ user }) {
  const [content, setContent] = useState('');
  const [open, setOpen] = useState(false);

  const post = async () => {
    if (!content.trim()) return;
    await axios.post('http://localhost:5000/api/announcements', {
      content,
      userId: user.id
    });
    setContent('');
    setOpen(false);
  };

  if (user.role !== 'admin') return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-all"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">New Announcement</h3>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border rounded-lg resize-none h-32"
              placeholder="Type your announcement..."
            />
            <div className="flex gap-3 mt-4">
              <button onClick={post} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
                Post
              </button>
              <button onClick={() => setOpen(false)} className="flex-1 bg-gray-200 py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
