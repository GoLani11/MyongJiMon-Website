import React, { useState } from "react";
import {nanoid} from "nanoid";

import './Board.css';
import BoardTitle from '../../components/BoardTitle';
import BoardContent from '../../components/BoardContent';
import PostView from '../../components/PostView';
import CommentEdit from '../../components/CommentEdit';
import Comment from '../../components/Comment';

function Board(props) {
  const [isWatching, setIsWatching] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [boards, setboards] = useState([

  ]);

  const [posts, setPosts] = useState([
    { postId: nanoid(), PostName: "새로운 취미 시작히기", Name: "aaaaa", CreateTime: "2025-05-23 17:22:56", GoodCount: 0, CommentCount:"0", ViewCount: 0, UserTagName: "학생", PostContent: "post content1입니다."},
    { postId: nanoid(), PostName: "새로운 취미 시작히기 2", Name: "bbbbb", CreateTime: "2025-05-23 13:32:11", GoodCount: 0, CommentCount:"0", ViewCount: 0, UserTagName: "학생", PostContent: "post content2입니다."},
    { postId: nanoid(), PostName: "새로운 취미 시작히기 3", Name: "ccccc", CreateTime: "2025-05-23 08:00:00", GoodCount: 0, CommentCount:"0", ViewCount: 0, UserTagName: "임직원", PostContent: "post content3입니다."},
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
  }

  const boardContentList = posts.map((content) => 
    <BoardContent
      key = {content.postId}
      PostName={content.PostName}
      Name={content.Name}
      CreateTime={timeAgo(content.CreateTime)}
      GoodCount={content.GoodCount}
      CommentCount={content.CommentCount}
      UserTagName={content.UserTagName}
      PostContent={content.PostContent}
      onGoodCountClick={() => handlePostGoodCount(content.postId)}
      onContentClick={() => handlePostClick(content.postId)}
    />
  )

  const commentList = comments
    .filter((comment) => comment.postId === selectedPostId)
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
  )

  
  const handlePostGoodCount = (postId) => {
    const tempPost = posts.map((post) => {
      if (post.postId === postId) {
        return { ...post, GoodCount: post.GoodCount + 1 };
      }
      return post;
    });
    setPosts(tempPost);
  }

  const handleCommentGoodCount = (commentId) => {
    const tempComment = comments.map((comment) => {
      if (comment.commentId === commentId) {
        return { ...comment, commentGoodCount: comment.commentGoodCount + 1 };
      }
      return comment;
    });
    setComments(tempComment);
  }

  const handlePostClick = (postId) => {
    console.log(postId);
    setSelectedPostId(postId);
    setIsWatching(true);
  }

  const onBackToBoardClick = () => {
    setIsWatching(false); // 글 목록으로 돌아가기
  };

  function addComment(commentCreateTime, commentText)  {
    const newComment = { 
      commentId: nanoid(),
      postId: selectedPostId,
      commentOwner: "test",
      UserTagName: "학생",
      commentCreateTime: commentCreateTime,
      commentGoodCount: 0,
      commentText: commentText
    }
    console.log(commentCreateTime);
    setComments([...comments, newComment]);
  }

  const selectedPost = posts.find((post) => post.postId === selectedPostId);

  const boardTemplate = (
    <div>
      {boardContentList}
    </div>
  )

  const PostTemplate = (
    <div>
      <PostView
        key = {selectedPost?.postId}
        BoardTitle={props.BoardTitle}
        PostName={selectedPost?.PostName} 
        Name={selectedPost?.Name}
        ViewCount={selectedPost?.ViewCount}
        CreateTime={selectedPost?.CreateTime}
        GoodCount={selectedPost?.GoodCount}
        UserTagName={selectedPost?.UserTagName}
        PostContent={selectedPost?.PostContent}
        onGoodCountClick={() => handlePostGoodCount(selectedPost?.postId)}
        onBackToBoardClick={onBackToBoardClick}
      />
      <CommentEdit addComment={addComment}/>
      {commentList}
    </div>
  )

  return (
    <div>
      <BoardTitle BoardTitle={props.BoardTitle}/>
      {isWatching ? PostTemplate : boardTemplate}
    </div>
  );
}

export default Board;
