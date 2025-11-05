import React, { useState } from 'react';

const USERS = {
  "admin1": { id: "admin1", name: "Sarah (Admin)", role: "admin" },
  "user1": { id: "user1", name: "John Doe", role: "member" },
  "user2": { id: "user2", name: "Jane Smith", role: "member" },
  "user3": { id: "user3", name: "Mike Chen", role: "member" }
};

export default function Login({ onLogin }) {
  const [selected, setSelected] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">LiveOrgChat</h1>
        <p className="text-center text-gray-600 mb-6">Choose your user to login</p>
        <div className="space-y-3">
          {Object.entries(USERS).map(([id, user]) => (
            <button
              key={id}
              onClick={() => { setSelected(id); onLogin(user); }}
              className={`w-full p-4 rounded-lg border-2 transition-all ${
                selected === id
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                  : 'border-gray-300 hover:border-indigo-400'
              }`}
            >
              {user.name} {user.role === 'admin' && '👑'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
