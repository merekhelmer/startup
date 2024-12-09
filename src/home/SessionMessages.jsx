import React, { useEffect, useState } from 'react';

const SessionMessages = ({ webSocket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const handleWebSocketEvent = (event) => {
      if (event.type === 'userJoined') {
        setMessages((msgs) => [...msgs, `User ${event.data.userId} joined the session.`]);
      } else if (event.type === 'userLeft') {
        setMessages((msgs) => [...msgs, `User ${event.data.userId} left the session.`]);
      }
    };

    webSocket.addHandler(handleWebSocketEvent);

    return () => {
      webSocket.removeHandler(handleWebSocketEvent);
    };
  }, [webSocket]);

  return (
    <div>
      <h3>Session Messages</h3>
      <ul>
        {messages.map((message, idx) => (
          <li key={idx}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default SessionMessages;