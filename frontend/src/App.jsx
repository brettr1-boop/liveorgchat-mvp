import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SocketProvider } from './context/SocketContext';
import Login from './components/Login';
import AnnouncementCard from './components/AnnouncementCard';
import PostAnnouncement from './components/PostAnnouncement';

function App() {
  const [user, setUser] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  const fetchAnnouncements = async () => {
    const res = await axios.get('http://localhost:5000/api/announcements');
    setAnnouncements(res.data);
  };

  useEffect(() => {
    if (user) fetchAnnouncements();
  }, [user]);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <SocketProvider user={user}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-indigo-600 text-white p-4 shadow-md">
          <h1 className="text-2xl font-bold text-center">LiveOrgChat</h1>
          <p className="text-center text-sm mt-1">Logged in as: {user.name}</p>
        </header>

        <main className="max-w-4xl mx-auto p-4">
          <div className="space-y-4">
            {announcements.map(ann => (
              <AnnouncementCard
                key={ann._id}
                ann={ann}
                currentUser={user}
                totalUsers={4}
              />
            ))}
          </div>
        </main>

        <PostAnnouncement user={user} />
      </div>
    </SocketProvider>
  );
}

export default App;
