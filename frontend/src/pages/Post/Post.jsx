import React, { useState, useEffect } from "react";
import {nanoid} from "nanoid";
import DOMPurify from 'dompurify';

import BoardTitle from '../../components/BoardTitle';
import PostView from '../../components/PostView';
import CommentEdit from '../../components/CommentEdit';
import Comment from '../../components/Comment';

function Post({boardTitle, selectedPost}) {
    const [posts, setPosts] = useState([
        { postId: nanoid(), PostName: "새로운 취미 시작히기", Name: "aaaaa", CreateTime: "2025-05-23 17:22:56", GoodCount: 0, CommentCount:2, ViewCount: 0, UserTagName: "학생", PostContent: "<p><strong>새로운 취미를 시작하는 것</strong>은 매우 즐겁고 <em>도전적인</em> 일이 될 수 있습니다.</p><p>이제 저는 새로운 취미로 <a href='https://example.com'>요가</a>를 시작했어요!</p><p>여러분도 새로운 취미를 시작해 보세요!</p>"},
        { postId: nanoid(), PostName: "새로운 취미 시작히기 2", Name: "bbbbb", CreateTime: "2025-05-23 13:32:11", GoodCount: 0, CommentCount:3, ViewCount: 0, UserTagName: "학생", PostContent: "<p><strong>요리</strong>는 매우 재미있고, <em>창의적인</em> 활동입니다.</p><p>오늘은 <a href='https://example.com/recipe'>레시피</a>를 따라 <strong>초콜릿 케이크</strong>를 만들었어요!</p><p>여러분도 시도해 보세요!</p>"},
        { postId: nanoid(), PostName: "새로운 취미 시작히기 3", Name: "ccccc", CreateTime: "2025-05-23 08:00:00", GoodCount: 0, CommentCount:0, ViewCount: 0, UserTagName: "임직원", PostContent: "<p><strong>독서</strong>는 매우 <em>유익한</em> 취미입니다. 많은 사람들이 즐깁니다.</p><p>최근에 읽은 책은 <a href='https://example.com/book'>'프로그래밍 기초'</a>입니다. 정말 유익한 책이에요!</p>"},
    ]);

    const [comments, setComments] = useState([
        { commentId: nanoid(), postId: posts[0].postId, commentOwner: "aaaaa", UserTagName: "학생", commentCreateTime: "2025-05-24 21:57:44", commentGoodCount: 0, commentText: "test입니다." },
        { commentId: nanoid(), postId: posts[0].postId, commentOwner: "bbbbb", UserTagName: "학생", commentCreateTime: "2025-05-24 19:45:30", commentGoodCount: 3, commentText: "이것은 테스트 댓글입니다." },
        { commentId: nanoid(), postId: posts[1].postId, commentOwner: "ccccc", UserTagName: "학생", commentCreateTime: "2025-05-24 15:22:10", commentGoodCount: 5, commentText: "디자인 관련 의견을 남깁니다." },
        { commentId: nanoid(), postId: posts[1].postId, commentOwner: "ddddd", UserTagName: "학생", commentCreateTime: "2025-05-24 12:05:59", commentGoodCount: 1, commentText: "안녕하세요, 좋은 정보 감사합니다!" },
        { commentId: nanoid(), postId: posts[1].postId, commentOwner: "eeeee", UserTagName: "학생", commentCreateTime: "2025-05-23 08:00:00", commentGoodCount: 10, commentText: "이 내용은 정말 유익합니다." }
    ]);

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

    function addComment(commentCreateTime, commentText)  {
        const newComment = { 
        commentId: nanoid(),
        postId: selectedPost.postId,
        commentOwner: "test",
        UserTagName: "학생",
        commentCreateTime: commentCreateTime,
        commentGoodCount: 0,
        commentText: commentText
        }
        
        /* CommentCount 갱신 */
        /* 선택된 post는 selectedPost를 통해 알 수 있다 */
        const updatedPost = { ...selectedPost, CommentCount: selectedPost.CommentCount + 1};
        setPosts((prevPosts) => /*함수형 update는 첫번째 인자가 이전상태값 */
        prevPosts.map((post) =>
            post.postId === selectedPost.postId ? updatedPost : post
        )
        );
        
        setComments([...comments, newComment]);
    }

    const commentList = comments
        // .filter((comment) => comment.postId === selectedPost.postId)
        .filter((comment) => comment.postId === selectedPost.postId)
        .map((comment) => 
            <Comment
                key = {comment.commentId}
                commentOwner={comment.commentOwner}
                UserTagName={comment.UserTagName}
                commentCreateTime={timeAgo(comment.commentCreateTime)}
                commentGoodCount={comment.commentGoodCount}
                commentText={comment.commentText}
                onGoodCountClick={() => handleCommentGoodCount(comment.commentId)}
            />
        );
    
    const handlePostGoodCount = (postId) => {
        const tempPost = posts.map((post) => {
            if (post.postId === postId) {
                return { ...post, GoodCount: post.GoodCount + 1 };
            }
            return post;
        });
        setPosts(tempPost);
    };

    const handleCommentGoodCount = (commentId) => {
        const tempComment = comments.map((comment) => {
            if (comment.commentId === commentId) {
                return { ...comment, commentGoodCount: comment.commentGoodCount + 1 };
            }
            return comment;
        });
        setComments(tempComment);
    };

    return (
        <div>
            <BoardTitle boardTitle={boardTitle}/>
            <PostView
                key = {selectedPost?.postId}
                BoardTitle={boardTitle}
                PostName={selectedPost?.PostName} 
                Name={selectedPost?.Name}
                ViewCount={selectedPost?.ViewCount}
                CreateTime={selectedPost?.CreateTime}
                GoodCount={selectedPost?.GoodCount}
                UserTagName={selectedPost?.UserTagName}
                PostContent={selectedPost?.PostContent}
                onGoodCountClick={() => handlePostGoodCount(selectedPost?.postId)}
                // onBackToBoardClick={onBackToBoardClick}
            />
            <CommentEdit addComment={addComment}/>
            {commentList}
        </div>
    );

}

export default Post;