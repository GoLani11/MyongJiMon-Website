// 상단 헤더, 사이드바, 하단 네비게이션 등 공통 컴포넌트 import
/*
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import SidebarWidget from '../../components/SidebarWidget';
import BottomNav from '../../components/BottomNav';
*/

// 각 필요 스타일 import
// import '../../styles/layout.css';
// import '../../styles/global.css';

import { useAppContext } from "../DataContext";
import './Board.css';
import BoardTitle from '../../components/BoardTitle';
import BoardContent from '../../components/BoardContent';

function Board({boardTitleTest}) {
  const {posts, setPosts, updatePost} = useAppContext();

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
      postId = {content.postId}
      PostName={content.PostName}
      Name={content.Name}
      CreateTime={timeAgo(content.CreateTime)}
      GoodCount={content.GoodCount}
      CommentCount={content.CommentCount}
      UserTagName={content.UserTagName}
      onGoodCountClick={() => handlePostGoodCount(content.postId)}
      onContentClick={() => handlePostClick(content.postId)}
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

  const handlePostClick = (postId) => {
    const tempPost = posts.find((post) => post.postId === postId);
    // setSelectedPost(tempPost);

    /* ViewCount 갱신 */
    /* 선택된 post는 selectedPost를 통해 알 수 있다 */
    const updatedPost = { ...tempPost, ViewCount: tempPost.ViewCount + 1};

    // setPosts((prevPosts) => /*함수형 update는 첫번째 인자가 이전상태값 */
    //   prevPosts.map((post) =>
    //     post.postId === postId ? updatedPost : post
    //   )
    // );
    updatePost(updatedPost);
  }

  // useEffect(() => {

  //   }, [selectedPostId]); // 의존성 배열이 빈 배열이면 한 번만 실행

  return (
    <div>
      <BoardTitle BoardTitle={boardTitleTest}/>
      {boardContentList}
    </div>
  );
}

export default Board;
