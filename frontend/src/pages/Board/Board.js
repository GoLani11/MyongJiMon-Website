import { useState, useEffect } from "react";
import {nanoid} from "nanoid";
import DOMPurify from 'dompurify';

// 상단 헤더, 사이드바, 하단 네비게이션 등 공통 컴포넌트 import
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import SidebarWidget from '../../components/SidebarWidget';
import BottomNav from '../../components/BottomNav';

// 각 필요 스타일 import
import '../../styles/layout.css';
import '../../styles/global.css';

import './Board.css';
import BoardTitle from '../../components/BoardTitle';
import BoardContent from '../../components/BoardContent';
import PostView from '../../components/PostView';
import CommentEdit from '../../components/CommentEdit';
import Comment from '../../components/Comment';

function Board(props) {
  const [boards, setboards] = useState([
    
  ]);

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

  const [isWatching, setIsWatching] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState();
  const [selectedPost, setselectedPost] = useState();

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
      PostContent={DOMPurify.sanitize(content.PostContent)}
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
    const tempPost = posts.find((post) => post.postId === postId);

    setSelectedPostId(postId);
    setselectedPost(tempPost);

    /* ViewCount 갱신 */
    /* 선택된 post는 selectedPost를 통해 알 수 있다 */
    const updatedPost = { ...tempPost, ViewCount: tempPost.ViewCount + 1};
    setPosts((prevPosts) => /*함수형 update는 첫번째 인자가 이전상태값 */
      prevPosts.map((post) =>
        post.postId === postId ? updatedPost : post
      )
    );
  }

  useEffect(() => {
      if(selectedPostId !== undefined)
        setIsWatching(true);
    }, [selectedPostId]); // 의존성 배열이 빈 배열이면 한 번만 실행

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
    
    /* CommentCount 갱신 */
    /* 선택된 post는 selectedPost를 통해 알 수 있다 */
    const updatedPost = { ...selectedPost, CommentCount: selectedPost.CommentCount + 1};
    setPosts((prevPosts) => /*함수형 update는 첫번째 인자가 이전상태값 */
      prevPosts.map((post) =>
        post.postId === selectedPostId ? updatedPost : post
      )
    );
    
    setComments([...comments, newComment]);
  }

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
