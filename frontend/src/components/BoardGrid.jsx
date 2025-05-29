// src/components/BoardGrid.tsx
import React from "react";
import BoardColumn from "./BoardColumn";
import "../styles/layout.css";

// 실무 스타일 더미 데이터 (예: DB에서 불러온 형태)
const boards = [
  {
    boardId: "popular",
    boardName: "인기글",
    posts: [
      {
        id: "a1b2c3d4",
        nickname: "dev_hyun",
        time: "6시간 전",
        title: "React에서 구글 로그인 구현하기",
        likes: 12,
        comments: 4,
      },
      {
        id: "a1b2c3d5",
        nickname: "frontend_lee",
        time: "7시간 전",
        title: "Next.js vs CRA - 무엇을 선택할까?",
        likes: 9,
        comments: 3,
      },
    ],
  },
  {
    boardId: "free",
    boardName: "자유 게시판",
    posts: [
      {
        id: "z9x8w7v6",
        nickname: "debug_jjang",
        time: "3시간 전",
        title: "요즘 개발 동기부여 어떻게 하시나요?",
        likes: 2,
        comments: 1,
      },
      {
        id: "z9x8w7v7",
        nickname: "stack_study",
        time: "4시간 전",
        title: "오픈 API로 뉴스 데이터 수집해보기",
        likes: 0,
        comments: 0,
      },
    ],
  },
  {
    boardId: "question",
    boardName: "질문 게시판",
    posts: [
      {
        id: "q123abc",
        nickname: "curious_dev",
        time: "1시간 전",
        title: "React 상태 끌어올리기 정확히 언제 쓰나요?",
        likes: 1,
        comments: 3,
      },
      {
        id: "q124bcd",
        nickname: "javaboy",
        time: "2시간 전",
        title: "JPA N+1 문제 해결법이 궁금합니다",
        likes: 5,
        comments: 2,
      },
    ],
  },
  {
    boardId: "student",
    boardName: "학생 게시판",
    posts: [
      {
        id: "s001",
        nickname: "studentA",
        time: "5분 전",
        title: "시험 범위 어디까지죠?",
        likes: 0,
        comments: 1,
      },
      {
        id: "s002",
        nickname: "freshman23",
        time: "20분 전",
        title: "캠퍼스 맛집 추천 좀 해주세요",
        likes: 3,
        comments: 0,
      },
    ],
  },
  {
    boardId: "professor",
    boardName: "교수 게시판",
    posts: [
      {
        id: "p101",
        nickname: "prof_kim",
        time: "2시간 전",
        title: "이번 주 수업 자료 업로드 완료했습니다.",
        likes: 8,
        comments: 2,
      },
      {
        id: "p102",
        nickname: "dr_lee",
        time: "3시간 전",
        title: "과제 제출 마감 기한 연장 공지",
        likes: 15,
        comments: 6,
      },
    ],
  },
];

const BoardGrid = () => {
  return (
    <div className="board-grid">
      {boards.map((board) => (
        <BoardColumn
          key={board.boardId}
          title={board.boardName}
          posts={board.posts}
          boardId={board.boardId}
        />
      ))}
    </div>
  );
};

export default BoardGrid;