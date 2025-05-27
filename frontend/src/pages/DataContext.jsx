import React, { createContext, useContext, useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

// 초기 상태 정의
const initialBoards = [
    { boardId: nanoid(), boardName: "인기글" },
    { boardId: nanoid(), boardName: "자유 게시판" },
    { boardId: nanoid(), boardName: "질문 게시판" },
    { boardId: nanoid(), boardName: "학생 게시판" },
    { boardId: nanoid(), boardName: "교수 게시판" }
];

const initialPosts = [
    { postId: nanoid(), boardId: initialBoards[1].boardId, PostName: "새로운 취미 시작히기", Name: "aaaaa", CreateTime: "2025-05-23 17:22:56", GoodCount: 0, CommentCount: 2, ViewCount: 0, UserTagName: "학생", PostContent: "<p><strong>새로운 취미를 시작하는 것</strong>은 매우 즐겁고 <em>도전적인</em> 일이 될 수 있습니다.</p><p>이제 저는 새로운 취미로 <a href='https://example.com'>요가</a>를 시작했어요!</p><p>여러분도 새로운 취미를 시작해 보세요!</p>" },
    { postId: nanoid(), boardId: initialBoards[1].boardId, PostName: "새로운 취미 시작히기 2", Name: "bbbbb", CreateTime: "2025-05-23 13:32:11", GoodCount: 0, CommentCount: 3, ViewCount: 0, UserTagName: "학생", PostContent: "<p><strong>요리</strong>는 매우 재미있고, <em>창의적인</em> 활동입니다.</p><p>오늘은 <a href='https://example.com/recipe'>레시피</a>를 따라 <strong>초콜릿 케이크</strong>를 만들었어요!</p><p>여러분도 시도해 보세요!</p>" },
    { postId: nanoid(), boardId: initialBoards[3].boardId, PostName: "새로운 취미 시작히기 3", Name: "ccccc", CreateTime: "2025-05-23 08:00:00", GoodCount: 0, CommentCount: 0, ViewCount: 0, UserTagName: "임직원", PostContent: "<p><strong>독서</strong>는 매우 <em>유익한</em> 취미입니다. 많은 사람들이 즐깁니다.</p><p>최근에 읽은 책은 <a href='https://example.com/book'>'프로그래밍 기초'</a>입니다. 정말 유익한 책이에요!</p>" }
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

    return (
        <AppContext.Provider value={{ 
            boards, setBoards, 
            posts, setPosts, 
            comments, setComments, 
            addComment, addPost, updatePost, getPost,
            user, isLoggedIn, login, logout
        }}>
            {children}
        </AppContext.Provider>
    );
};
