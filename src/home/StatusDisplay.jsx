// src/home/StatusDisplay.jsx
import React, { useEffect, useState } from 'react';

const StatusDisplay = () => {
  const [groupStatus, setGroupStatus] = useState([]);
  const [recentSessions, setRecentSessions] = useState([]);

  useEffect(() => {
    //mock data 
    setGroupStatus([{ name: "User1", status: "Submitted Preferences" }, { name: "User2", status: "Waiting" }]);
    setRecentSessions([{ code: "ABC123", creator: "User1" }, { code: "XYZ789", creator: "User2" }]);
  }, []);

  return (
    <section>
      <h2>Group Status</h2>
      <ul>{groupStatus.map((user, index) => <li key={index}>{user.name} - {user.status}</li>)}</ul>
      <h2>Recent Sessions</h2>
      <ul>{recentSessions.map((session, index) => <li key={index}>{session.code} - Created by {session.creator}</li>)}</ul>
    </section>
  );
};

export default StatusDisplay;
