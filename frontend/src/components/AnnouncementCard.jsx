import React, { useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';

export default function AnnouncementCard({ ann, currentUser, totalUsers = 4 }) {
  const socket = useSocket();
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && socket && ann._id) {
          socket.emit('markSeen', { annId: ann._id });
        }
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [ann._id, socket]);

  const seenCount = ann.seenBy.length;
  const notSeen = totalUsers - seenCount;

  return (
    <div ref={cardRef} className="bg-white border-l-4 border-indigo-600 p-5 mb-4 rounded-r-lg shadow-sm">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="font-bold text-indigo-900">{ann.sender}</p>
          <p className="mt-1 text-gray-800 whitespace-pre-wrap">{ann.content}</p>
          <p className="text-xs text-gray-500 mt-2">
            {new Date(ann.timestamp).toLocaleString()}
          </p>
        </div>
        <div className="text-right ml-4">
          <div className="text-green-600 font-bold text-lg">✓ {seenCount}</div>
          <p className="text-xs text-gray-500">of {totalUsers}</p>
        </div>
      </div>

      <details className="mt-3 text-sm">
        <summary className="cursor-pointer text-indigo-600 font-medium">
          Seen by: {seenCount} {notSeen > 0 && `(${notSeen} pending)`}
        </summary>
        <div className="mt-2 p-3 bg-gray-50 rounded-lg text-xs max-h-40 overflow-y-auto">
          {ann.seenBy.map((s, i) => (
            <div key={i} className="flex justify-between py-1 border-b border-gray-200 last:border-0">
              <span className="font-medium">{s.username}</span>
              <span className="text-gray-400">
                {new Date(s.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
          {notSeen > 0 && (
            <p className="text-orange-600 font-medium mt-2">
              {notSeen} user{notSeen > 1 ? 's' : ''} not seen yet
            </p>
          )}
        </div>
      </details>
    </div>
  );
}
