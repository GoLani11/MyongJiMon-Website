import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useParams, useNavigate } from 'react-router-dom';

import { useAppContext } from "../DataContext";
import BoardTitle from '../../components/BoardTitle';
import PostView from '../../components/PostView';
import Comment from '../../components/Comment';
import "./Post.css"

// 상단 헤더, 사이드바, 하단 네비게이션 등 공통 컴포넌트 import
import Header from '../../components/Header.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import SidebarWidget from '../../components/SidebarWidget.jsx';
import BottomNav from '../../components/BottomNav.jsx';

// 각 필요 스타일 import
import '../../styles/layout.css';
import '../../styles/global.css';

// 반응형 design import
import "../../styles/responsive.css";

function Post() {
    const { user, getUserTag, comments, setComments, updatePost, getPost, addComment, getBoard, getFormattedDateTime, 
        addPostLike, addCommentLike, isAlreadyPostLike, isAlreadyCommentLike } = useAppContext();
    const { postId } = useParams();
    const [inputText, setInputText] = useState("");
    const navigate = useNavigate();

    // postId가 없으면, home로 redirect
    if(!postId) {
        navigate('/home')
        return null; // no rendering
    } 
    
    const post = getPost(postId);

    // 없는 post라면, home로 redirect
    if( post === undefined) {
        navigate('/home');
        return null;
    }
    
    const board = getBoard(post.boardId);
    const boardId = board.boardId;
    const boardTitle = board.boardName;

    const commentList = comments
        // .filter((comment) => comment.postId === post.postId)
        .filter((comment) => comment.postId === post.postId)
        .map((comment) => 
            <Comment
                key = {comment.commentId}
                commentId = {comment.commentId}
                commentOwner={comment.commentOwner}
                UserTagName={comment.UserTagName}
                commentCreateTime={timeAgo(comment.commentCreateTime)}
                commentGoodCount={comment.commentGoodCount}
                commentText={comment.commentText}
                onGoodCountClick={() => handleCommentGoodCount()}
            />
        );

    function timeAgo(inputDateTime) {
        const currentTime = new Date();
        const inputDate = new Date(inputDateTime);

        // 두 날짜 간의 차이 (밀리초 단위)
        const diffInSeconds = Math.floor((currentTime - inputDate) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInSeconds < 60) {
        return `${diffInSeconds}초 전`;
        } else if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`;
        } else if (diffInHours < 24) {
        return `${diffInHours}시간 전`;
        } else if (diffInDays < 365) {
        return `${diffInDays}일 전`;
        } else {
        return `${Math.floor(diffInDays / 365)}년 전`;
        }
    };

    const handleInputTextChange = (e) => {
        setInputText(e.target.value);
    }

     function handleCommentAddButton(e) {
        const newComment = { 
            commentId: nanoid(),
            postId: post.postId,
            commentOwner: user?.username,
            UserTagName: getUserTag(user?.type),
            commentCreateTime: getFormattedDateTime(),
            commentGoodCount: 0,
            commentText: inputText
        }
        
        /* CommentCount 갱신 */
        /* 선택된 post는 post를 통해 알 수 있다 */
        const updatedPost = { ...post, CommentCount: post.CommentCount + 1};
        
        addComment(newComment);
        updatePost(updatedPost);
        setInputText("");
    }

    const onBackToBoardClick = () => {
        navigate(`/board/${boardId}`);
    }

    const handlePostGoodCount = () => {
        // '좋아요'를 하지 않은 사용자라면
        if (!isAlreadyPostLike(user?.id, postId)) {
            // '게시글 좋아요' table에 추가
            const postLikeObj = {
                postId: postId,
                boardId: boardId,
                userId: user?.id,
                currentTime: getFormattedDateTime()
            };
            addPostLike(postLikeObj);
            
            // 해당 post의 좋아요 값 + 1
            const tempPost = { ...post, GoodCount: post.GoodCount + 1 };
            updatePost(tempPost);
        }
    };

    const handleCommentGoodCount = (commentId) => {
         // '좋아요'를 하지 않은 사용자라면
        if (!isAlreadyCommentLike(user?.id, commentId)) {
            // '댓글 좋아요' table에 추가
            const commentLikeObj = {
                commentId: commentId,
                postId: postId,
                userId: user?.id,
                currentTime: getFormattedDateTime()
            };
            addCommentLike(commentLikeObj);

            // 해당 댓글의 좋아요 값 + 1
            const tempComment = comments.map((comment) => {
                if (comment.commentId === commentId) {
                    return { ...comment, commentGoodCount: comment.commentGoodCount + 1 };
                }
                return comment;
            });
            setComments(tempComment);
        }
    };

    return (
        <div className="post_root_box">
            <Header />
            <div className="sidebar-wrapper">
                <div className="sidebar-trigger" />
                <Sidebar />
            </div>

            <div className="post_main_content_box">
                <div className="balance_weight_box" />
                {/* Original Content */}
                <div className="post_center_content_box">
                    <BoardTitle boardTitle={boardTitle}/>
                    <PostView
                        key = {post?.postId}
                        BoardTitle={boardTitle}
                        PostName={post?.PostName} 
                        Name={post?.Name}
                        ViewCount={post?.ViewCount}
                        // "몇초전"과 같은 형식으로 변경
                        CreateTime={timeAgo(post?.CreateTime)}
                        GoodCount={post?.GoodCount}
                        UserTagName={post?.UserTagName}
                        PostContent={post?.PostContent}
                        onGoodCountClick={handlePostGoodCount}
                        onBackToBoardClick={onBackToBoardClick}
                    />
                    <div className="comment_edit_box">
                        <textarea 
                            className="comment_edit_textarea"
                            onChange={handleInputTextChange}
                            value={inputText}
                        />
                        <img 
                            className="comment_edit_box_send_icon" 
                            src="/imgs/send_icon.png" 
                            alt="comment edit button"
                            onClick={handleCommentAddButton}
                        />
                    </div>
                    <div>
                        {commentList}
                    </div>
                </div>
                <SidebarWidget />
            </div>
            <BottomNav />
        </div>
    );

}

export default Post;