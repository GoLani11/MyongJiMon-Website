import React, { useState } from 'react';
import './ChatBot.css';

export default function ChatBot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: '안녕하세요! 명지몬입니다. 무엇을 도와드릴까요?' },
    { id: 2, type: 'bot', text: '아래 메뉴를 눌러 원하는 정보를 찾아보세요.' },
  ]);

  const [page, setPage] = useState(0); // 슬라이드 페이지

  const menuButtons = [
    { label: '규정안내', icon: '📘' },
    { label: 'FAQ/챗봇소개', icon: '💬' },
    { label: '교내연락처', icon: '☎️' },
    { label: '식단', icon: '🍽️' },
    { label: '장학', icon: '🌱' },
    { label: '등록금', icon: '💰' },
    { label: '학사일정', icon: '📅' },
    { label: '증명서', icon: '📄' },
    { label: '도서관', icon: '📚' },
    { label: '강의평가', icon: '📝' },
    { label: '기숙사', icon: '🏠' },
    { label: '상담센터', icon: '🧠' },
    { label: '동아리', icon: '🎨' },
    { label: '행사안내', icon: '🎉' },
    { label: '채용정보', icon: '💼' },
    { label: '공지사항', icon: '📢' },
  ];

  const totalPages = Math.ceil(menuButtons.length / 8);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: input,
    };
    setMessages([...messages, userMessage]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      {/* 헤더 */}
      <div className="chatbot-header">
        <div className="logo">명지몬</div>
        <div className="lang">KR/EN</div>
        <div className="menu">≡</div>
      </div>

      {/* 메시지 영역 */}
      <div className="chatbot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-bubble ${msg.type}`}>
            {msg.text}
          </div>
        ))}
      </div>

      {/* 메뉴 버튼 그리드 */}
      <div className="menu-slider">
        <div className="menu-page">
          {menuButtons
            .slice(page * 8, page * 8 + 8)
            .map((btn, i) => (
              <div key={i} className="menu-button">
                <div className="icon">{btn.icon}</div>
                <div className="label">{btn.label}</div>
              </div>
            ))}
        </div>

        {/* 페이지 인디케이터 */}
        <div className="page-dots">
          {Array.from({ length: totalPages }, (_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === page ? 'active' : ''}`}
              onClick={() => setPage(idx)}
            >
              ●
            </span>
          ))}
        </div>
      </div>

      {/* 입력창 */}
      <div className="chatbot-input">
        <span className="home-icon">🏠</span>
        <input
          type="text"
          placeholder="질문을 입력하세요."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={sendMessage}>↗</button>
      </div>
    </div>
  );
}