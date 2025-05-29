import React, { createContext, useContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

// 초기 상태 정의
const initialBoards = [
    { boardId: "popular", boardName: "자유 게시판" },
    { boardId: "free", boardName: "자유 게시판" },
    { boardId: "question", boardName: "질문 게시판" },
    { boardId: "student", boardName: "학생 게시판" },
    { boardId: "professor", boardName: "교수 게시판" }
];

const initialPosts = [
    { postId: nanoid(), boardId: "popular", PostName: "요즘 인기 있는 여행지 추천", Name: "김민수", CreateTime: "2025-05-28 14:00:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>최근에 다녀온 여행지 중 가장 인상 깊었던 곳들을 소개합니다. 자연과 문화가 어우러진 곳들인데요, 여러분도 여행 계획 세우실 때 참고하세요!</p>" },
    { postId: nanoid(), boardId: "popular", PostName: "책 추천해 주세요!", Name: "이서연", CreateTime: "2025-05-28 14:05:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>요즘 읽을 만한 책이 있을까요? 자기계발이나 소설 모두 좋아합니다. 좋은 책 있으면 추천 부탁드려요!</p>" },
    { postId: nanoid(), boardId: "popular", PostName: "건강한 다이어트 방법 공유", Name: "박준호", CreateTime: "2025-05-28 14:10:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>극단적인 다이어트 대신 꾸준히 할 수 있는 건강한 다이어트 방법에 대해 이야기해 봐요. 식단과 운동 팁도 환영입니다!</p>" },
    { postId: nanoid(), boardId: "popular", PostName: "취미 생활 추천", Name: "최유진", CreateTime: "2025-05-28 14:15:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>요즘 시작해볼 만한 취미가 있을까요? 저는 그림 그리기와 악기 연주에 관심 있어요.</p>" },
    { postId: nanoid(), boardId: "popular", PostName: "스트레스 해소 방법", Name: "정하늘", CreateTime: "2025-05-28 14:20:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>학업과 일상 스트레스 어떻게 푸시나요? 효과적인 방법 공유해요!</p>" },
    { postId: nanoid(), boardId: "popular", PostName: "영화 추천합니다", Name: "한지우", CreateTime: "2025-05-28 14:25:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>최근에 본 영화 중에 정말 재미있었던 작품 추천해요. 모두들 꼭 보세요!</p>" },
    { postId: nanoid(), boardId: "popular", PostName: "새 학기 준비 팁", Name: "윤서진", CreateTime: "2025-05-28 14:30:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>새 학기 준비하면서 도움이 된 팁 공유해 봅니다. 시간 관리가 가장 중요하더라고요.</p>" },
    { postId: nanoid(), boardId: "popular", PostName: "맛집 추천 부탁해요", Name: "김도현", CreateTime: "2025-05-28 14:35:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>서울 근처 숨겨진 맛집 있으면 추천해 주세요! 저는 매운 음식을 좋아합니다.</p>" },
    { postId: nanoid(), boardId: "popular", PostName: "운동 루틴 공유", Name: "임수빈", CreateTime: "2025-05-28 14:40:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>효과 좋은 운동 루틴 있으면 알려주세요. 홈트레이닝 중심으로요.</p>" },
    { postId: nanoid(), boardId: "popular", PostName: "자기계발 도서 추천", Name: "서지훈", CreateTime: "2025-05-28 14:45:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>최근에 읽은 자기계발서 중에서 인상 깊었던 책 추천합니다. 동기부여에 좋았어요.</p>" },
    { postId: nanoid(), boardId: "free", PostName: "오늘 뭐 먹었나요?", Name: "이수민", CreateTime: "2025-05-28 14:50:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>오늘 점심 뭐 먹었나요? 저는 치킨을 먹었는데 너무 맛있었어요! 여러분의 추천 음식도 알려주세요.</p>" },
    { postId: nanoid(), boardId: "free", PostName: "취미 생활 공유해요", Name: "박지윤", CreateTime: "2025-05-28 14:55:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>최근에 새로 시작한 취미 있으신가요? 저는 그림 그리기를 시작했어요. 다들 어떤 취미 하시는지 궁금합니다!</p>" },
    { postId: nanoid(), boardId: "free", PostName: "새로운 친구 만들기", Name: "김영호", CreateTime: "2025-05-28 15:00:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>대학 생활에서 새로운 친구를 만들기 위한 팁 공유해요. 혹시 좋은 방법 있으면 알려주세요.</p>" },
    { postId: nanoid(), boardId: "free", PostName: "주말에 뭐 할까요?", Name: "정민지", CreateTime: "2025-05-28 15:05:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>이번 주말에 뭘 할지 아직 정하지 못했어요. 추천할만한 활동 있나요?</p>" },
    { postId: nanoid(), boardId: "free", PostName: "매일 읽을 만한 웹툰 추천", Name: "최유진", CreateTime: "2025-05-28 15:10:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>재미있게 볼 수 있는 웹툰 있으면 추천 부탁드려요! 요즘 자주 보는 웹툰 있나요?</p>" },
    { postId: nanoid(), boardId: "free", PostName: "음악 추천해주세요", Name: "한정훈", CreateTime: "2025-05-28 15:15:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>새로운 음악을 찾고 있어요! 요즘 핫한 노래 있으면 추천해주세요!</p>" },
    { postId: nanoid(), boardId: "free", PostName: "기타 배우기 좋은 앱 추천", Name: "박서영", CreateTime: "2025-05-28 15:20:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>기타를 배우고 싶은데 어떤 앱이 좋을까요? 경험이 있으신 분들의 추천 부탁드려요.</p>" },
    { postId: nanoid(), boardId: "free", PostName: "가장 좋아하는 영화 장르", Name: "이수빈", CreateTime: "2025-05-28 15:25:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>저는 SF 영화를 좋아하는데, 여러분은 어떤 장르를 좋아하세요?</p>" },
    { postId: nanoid(), boardId: "free", PostName: "가장 기억에 남는 여행지", Name: "한유진", CreateTime: "2025-05-28 15:30:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>기억에 남는 여행지 있나요? 저는 제주도가 너무 좋았어요!</p>" },
    { postId: nanoid(), boardId: "free", PostName: "운동 시작하려고 합니다", Name: "윤재석", CreateTime: "2025-05-28 15:35:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>건강을 위해 운동을 시작하려고 합니다. 어떤 운동이 좋을까요?</p>" },
    { postId: nanoid(), boardId: "question", PostName: "리액트에서 useState 사용법", Name: "김민정", CreateTime: "2025-05-28 15:40:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>리액트에서 useState를 어떻게 사용하는지에 대해 알고 싶습니다. 예시와 함께 설명 부탁드립니다!</p>" },
    { postId: nanoid(), boardId: "question", PostName: "API 호출 방법", Name: "박상민", CreateTime: "2025-05-28 15:45:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>API를 호출할 때 async/await을 어떻게 사용하는지 알려주세요.</p>" },
    { postId: nanoid(), boardId: "question", PostName: "자바스크립트 함수형 프로그래밍", Name: "정다은", CreateTime: "2025-05-28 15:50:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>자바스크립트에서 함수형 프로그래밍을 어떻게 활용할 수 있을까요?</p>" },
    { postId: nanoid(), boardId: "question", PostName: "React와 Redux 비교", Name: "이정훈", CreateTime: "2025-05-28 15:55:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>리액트와 리덕스를 비교해 보았을 때 장단점은 무엇인가요? 선택 기준이 궁금합니다.</p>" },
    { postId: nanoid(), boardId: "question", PostName: "배열 메서드 차이점", Name: "정수진", CreateTime: "2025-05-28 16:00:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>자바스크립트에서 `map()`과 `forEach()`의 차이점에 대해 알고 싶습니다.</p>" },
    { postId: nanoid(), boardId: "question", PostName: "자바스크립트 비동기 처리", Name: "김지혜", CreateTime: "2025-05-28 16:05:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>자바스크립트에서 비동기 처리하는 방법에 대해 알고 싶습니다. Promise와 async/await의 차이점은 무엇인가요?</p>" },
    { postId: nanoid(), boardId: "question", PostName: "CSS Flexbox 사용법", Name: "이서진", CreateTime: "2025-05-28 16:10:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>Flexbox를 사용할 때 주의해야 할 점과 유용한 팁이 있다면 공유해 주세요!</p>" },
    { postId: nanoid(), boardId: "question", PostName: "웹 성능 최적화 방법", Name: "최민수", CreateTime: "2025-05-28 16:15:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>웹 성능을 최적화하기 위한 좋은 방법이 있을까요? 페이지 로딩 속도나 이미지 최적화 방법에 대해 알고 싶습니다.</p>" },
    { postId: nanoid(), boardId: "question", PostName: "ES6 문법", Name: "김태수", CreateTime: "2025-05-28 16:20:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>ES6에서 새로 추가된 문법 중 가장 유용한 것이 무엇인가요? 사용할 때 주의할 점도 궁금합니다.</p>" },
    { postId: nanoid(), boardId: "question", PostName: "브라우저 호환성 이슈 해결", Name: "정유진", CreateTime: "2025-05-28 16:25:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>브라우저 호환성 이슈를 해결하는 방법에 대해 알고 싶습니다. 각 브라우저에서 동일한 UI가 나오게 하려면 어떤 점에 주의해야 할까요?</p>" },
    { postId: nanoid(), boardId: "student", PostName: "대학생활의 즐거운 점", Name: "김지훈", CreateTime: "2025-05-28 16:30:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>대학생활의 가장 큰 장점은 무엇인가요? 저는 자유로운 시간 관리가 정말 좋았어요.</p>" },
    { postId: nanoid(), boardId: "student", PostName: "학점 관리 꿀팁", Name: "박영주", CreateTime: "2025-05-28 16:35:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>학점을 잘 관리하는 꿀팁이 있다면 알려주세요! 제가 요즘 고민 중이에요.</p>" },
    { postId: nanoid(), boardId: "student", PostName: "추천할 만한 스터디", Name: "이하나", CreateTime: "2025-05-28 16:40:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>어떤 스터디가 좋을까요? 저는 효율적인 공부법을 찾고 있어요.</p>" },
    { postId: nanoid(), boardId: "student", PostName: "대학생활의 스트레스 해소법", Name: "최우석", CreateTime: "2025-05-28 16:45:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>대학생활 중 스트레스를 어떻게 풀고 있나요? 운동이나 취미 활동을 통해 풀고 있는데, 다른 방법도 궁금합니다.</p>" },
    { postId: nanoid(), boardId: "student", PostName: "동아리 추천", Name: "정수진", CreateTime: "2025-05-28 16:50:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>대학생 동아리를 추천해 주세요! 활동이 재미있고 유익한 동아리가 있으면 좋겠어요.</p>" },
    { postId: nanoid(), boardId: "student", PostName: "효율적인 시간 관리 방법", Name: "김서윤", CreateTime: "2025-05-28 16:55:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>시간 관리를 잘 할 수 있는 방법이 있을까요? 대학 생활에서 효율적으로 시간을 사용하는 팁이 궁금합니다.</p>" },
    { postId: nanoid(), boardId: "student", PostName: "인턴 경험 공유", Name: "한정훈", CreateTime: "2025-05-28 17:00:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>인턴 경험이 있다면 공유해주세요! 어떤 회사에서 일했고 어떤 일을 했는지 궁금합니다.</p>" },
    { postId: nanoid(), boardId: "student", PostName: "학습 자료 추천", Name: "윤민정", CreateTime: "2025-05-28 17:05:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>공부할 때 도움이 되는 학습 자료나 사이트가 있으면 추천해주세요. 온라인 강의도 좋습니다!</p>" },
    { postId: nanoid(), boardId: "student", PostName: "기타 추천", Name: "오세훈", CreateTime: "2025-05-28 17:10:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>기타 배우고 싶은데 어떤 입문용 기타가 좋은지 추천해주세요. 제가 기타를 처음 시작하려고 합니다.</p>" },
    { postId: nanoid(), boardId: "student", PostName: "졸업 후 진로 고민", Name: "이지은", CreateTime: "2025-05-28 17:15:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "학생", PostContent: "<p>졸업 후 진로에 대해 고민 중입니다. 취업 준비를 어떻게 해야 할지 막막해요.</p>" },
    { postId: nanoid(), boardId: "professor", PostName: "학생 지도 팁", Name: "김성현", CreateTime: "2025-05-28 17:20:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "교수", PostContent: "<p>학생들을 효과적으로 지도하는 팁이 있다면 공유해 주세요. 저는 주로 개인적인 접근 방식을 선호합니다.</p>" },
    { postId: nanoid(), boardId: "professor", PostName: "효율적인 강의 준비", Name: "박정아", CreateTime: "2025-05-28 17:25:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "교수", PostContent: "<p>강의를 준비할 때 주로 어떤 방법을 사용하시나요? 저는 수업 자료와 함께 실시간 피드백을 중요시합니다.</p>" },
    { postId: nanoid(), boardId: "professor", PostName: "연구 과제 아이디어", Name: "최은지", CreateTime: "2025-05-28 17:30:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "교수", PostContent: "<p>최근 연구 과제로 어떤 주제를 선정했나요? 함께 아이디어를 공유하고 논의해봅시다.</p>" },
    { postId: nanoid(), boardId: "professor", PostName: "학생 평가 시스템 개선", Name: "이민호", CreateTime: "2025-05-28 17:35:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "교수", PostContent: "<p>학생들의 평가 시스템을 개선하기 위한 방법에 대해 토론해봅시다. 더 공정하고 투명한 평가가 필요합니다.</p>" },
    { postId: nanoid(), boardId: "professor", PostName: "수업 참여도 평가", Name: "정유미", CreateTime: "2025-05-28 17:40:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "교수", PostContent: "<p>수업에서 학생들의 참여도를 어떻게 평가하고 있나요? 참여도를 효과적으로 측정할 수 있는 방법이 있을까요?</p>" },
    { postId: nanoid(), boardId: "professor", PostName: "논문 제출 및 리뷰", Name: "김주현", CreateTime: "2025-05-28 17:45:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "교수", PostContent: "<p>학생들의 논문을 리뷰할 때 중요한 점은 무엇인가요? 피드백을 효과적으로 주는 방법이 궁금합니다.</p>" },
    { postId: nanoid(), boardId: "professor", PostName: "학문적 연구 방법", Name: "이수경", CreateTime: "2025-05-28 17:50:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "교수", PostContent: "<p>학문적 연구를 진행할 때 가장 중요하게 생각하는 점은 무엇인가요? 실험과 이론 연구의 균형에 대해 논의해봅시다.</p>" },
    { postId: nanoid(), boardId: "professor", PostName: "교수-학생 관계 개선", Name: "홍진우", CreateTime: "2025-05-28 17:55:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "교수", PostContent: "<p>교수와 학생 간의 신뢰를 구축하기 위한 방법은 무엇일까요? 열린 소통의 중요성에 대해 이야기해봅시다.</p>" },
    { postId: nanoid(), boardId: "professor", PostName: "온라인 수업의 장단점", Name: "김다혜", CreateTime: "2025-05-28 18:00:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "교수", PostContent: "<p>온라인 수업의 장단점에 대해 논의하고 싶습니다. 저는 대면 수업을 선호하지만, 온라인 수업의 유용한 점도 있습니다.</p>" },
    { postId: nanoid(), boardId: "professor", PostName: "연구 자금 확보 방법", Name: "윤정호", CreateTime: "2025-05-28 18:05:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "교수", PostContent: "<p>연구 자금을 확보하기 위한 전략에 대해 이야기해봅시다. 저는 자금 확보를 위해 다양한 기관과 협력 중입니다.</p>" }
];

const initialComments = [
    { commentId: nanoid(), postId: initialPosts[0].postId, commentOwner: "aaaaa", UserTagName: "학생", commentCreateTime: "2025-05-24 21:57:44", commentGoodCount: 0, commentText: "test입니다." },
    { commentId: nanoid(), postId: initialPosts[0].postId, commentOwner: "bbbbb", UserTagName: "학생", commentCreateTime: "2025-05-24 19:45:30", commentGoodCount: 3, commentText: "이것은 테스트 댓글입니다." },
    { commentId: nanoid(), postId: initialPosts[1].postId, commentOwner: "ccccc", UserTagName: "학생", commentCreateTime: "2025-05-24 15:22:10", commentGoodCount: 5, commentText: "디자인 관련 의견을 남깁니다." },
    { commentId: nanoid(), postId: initialPosts[1].postId, commentOwner: "ddddd", UserTagName: "학생", commentCreateTime: "2025-05-24 12:05:59", commentGoodCount: 1, commentText: "안녕하세요, 좋은 정보 감사합니다!" },
    { commentId: nanoid(), postId: initialPosts[1].postId, commentOwner: "eeeee", UserTagName: "학생", commentCreateTime: "2025-05-23 08:00:00", commentGoodCount: 10, commentText: "이 내용은 정말 유익합니다." }
];

// Context 생성
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

// Context Provider 컴포넌트
export const AppProvider = ({ children }) => {
    const [boards, setBoards] = useState(initialBoards);
    const [posts, setPosts] = useState(initialPosts);
    const [comments, setComments] = useState(initialComments);
    
    // 사용자 인증 상태 관리
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 컴포넌트 마운트 시 로컬스토리지에서 사용자 정보 확인
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            try {
                const userData = JSON.parse(savedUser);
                setUser(userData);
                setIsLoggedIn(true);
            } catch (error) {
                console.error('사용자 정보 파싱 오류:', error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    // 로그인 함수
    const login = (userData) => {
        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    // 로그아웃 함수
    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('user');
        localStorage.removeItem('rememberedUsername');
    };

    const addComment = (newComment) => {
        setComments((prevComments) => [...prevComments, newComment]);
    };

    const addPost = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]);
    };

    const updatePost = (targetPost) => {
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post.postId === targetPost.postId ? targetPost : post
            )
        )
    }

    const getPost = (selectedPostId) => {
        const selectedPost = posts.find(post => post.postId === selectedPostId);

        return selectedPost;
    }

    const getBoard = (boardId) => {
        const board = boards.find(board => board.boardId === boardId);

        return board;
    }

    const isValidBoardId = (boardId) => {
        // some()은 배열에서 조건을 만족하는 요소가 하나라도 있으면 true를 반환
        return boards.some(board => board.boardId === boardId);
    }

    return (
        <AppContext.Provider value={{ 
            boards, setBoards, 
            posts, setPosts, 
            comments, setComments, 
            addComment, addPost, updatePost, getPost, getBoard, isValidBoardId,
            user, isLoggedIn, login, logout
        }}>
            {children}
        </AppContext.Provider>
    );
};
