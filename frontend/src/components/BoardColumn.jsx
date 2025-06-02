// src/components/BoardColumn.tsx
import React from "react";
import {Link} from "react-router-dom";
import "../styles/layout.css";

const BoardColumn = ({ title, posts, boardId}) => {
  return (
    <section className="board-column">
      <h2 className="board-title">
        <Link className="board_title_link" to={`/board/${boardId}`}>{title}</Link>
      </h2>
      <ul className="board-posts">
        {posts.map((post) => (
          <li key={post.id} className="board-post">
            {/* 첫 번째 줄: 작성자 정보 + 리액션 */}
            <div className="post-header">
              <div className="author-info">
                <div className="profile" />
                <span className="nickname">{post.nickname}</span>
                <span className="time">{post.time}</span>
              </div>
              <div className="reactions">
                <div className="reaction-item">
                  <img src="/imgs/good_icon_blue.png" alt="좋아요" className="reaction-icon" />
                  <span>{post.likes}</span>
                </div>
                <div className="reaction-item">
                  <img src="/imgs/comment_icon.png" alt="댓글" className="reaction-icon" />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
            {/* 두 번째 줄: 게시글 제목 */}
            <div className="post-bottom">
              <span className="post-title">{post.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BoardColumn;