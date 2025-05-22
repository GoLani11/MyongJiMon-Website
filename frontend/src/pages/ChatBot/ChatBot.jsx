import React, { useState, useEffect, useRef } from 'react';
import './ChatApp.css';

function ChatApp() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'you', text: '안녕하세요! 😊' },
    { id: 2, sender: 'me', text: '안녕하세요! 반가워요.' },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { id: messages.length + 1, sender: 'me', text: input }]);
    setInput('');
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">챗봇</div>
      <div className="chat-body">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sender}`}>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={input}
          placeholder="메시지를 입력하세요..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
}

export default ChatApp;