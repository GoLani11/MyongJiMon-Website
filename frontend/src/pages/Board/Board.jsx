import { MdEdit } from 'react-icons/md';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';

// 상단 헤더, 사이드바, 하단 네비게이션 등 공통 컴포넌트 import
import Header from '../../components/Header.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import SidebarWidget from '../../components/SidebarWidget.jsx';
import BottomNav from '../../components/BottomNav.jsx';

import { useAppContext } from "../DataContext.jsx";
import './Board.css';
import BoardTitle from '../../components/BoardTitle.jsx';
import BoardContent from '../../components/BoardContent.js';
import Pagination from '../../components/Pagination.jsx';

function Board() {
  const { posts, setPosts, updatePost, getBoard, postPerPage } = useAppContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // url 경로 parameter 가져오기
  const { boardId } = useParams();

  if(!boardId) {
    navigate('/home');
    return null; // no rendering
  }

  // query parameter 가져오기 e.g. ?key=value
  const currentPageNum = parseInt(searchParams.get('page')) || 1; // page parameter가 없으면 1

  const boardName = getBoard(boardId).boardName;

  // 한 page에 출력할 게시글의 개수대로 posts를 분할해둔다.
  const startIndex = (currentPageNum - 1) * postPerPage;
  const pagedPosts = posts
    .slice().reverse() // 원본 배열을 변경하지 않고, 복사본을 뒤집는다.
    .filter((post) => post.boardId === boardId)
    .slice(startIndex, startIndex + postPerPage);

  // 한 page에 출력한 게시글들을 생성
  const boardContentList = pagedPosts.map((content) => 
    <BoardContent
      key = {content.postId}
      postId = {content.postId}
      PostName={content.PostName}
      Name={content.Name}
      CreateTime={timeAgo(content.CreateTime)}
      ViewCount={content.ViewCount}
      GoodCount={content.GoodCount}
      CommentCount={content.CommentCount}
      UserTagName={content.UserTagName}
      onGoodCountClick={() => handlePostGoodCount(content.postId)}
      onContentClick={() => handlePostClick(content.postId)}
    />
  )

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

  const handlePostEditButtonclick = () => {
    navigate(`/postedit?board=${boardId}`);
  }

  // page 변경 handler
  const handlePageChange = (newPageNum) => {
    setSearchParams({ page: newPageNum.toString() });
  };

  return (
    <div className="page-container board_root_box">
      <Header />
      <div className="sidebar-wrapper">
        <div className="sidebar-trigger" />
        <Sidebar />
      </div>

      <div className="board_main_content_box">
        <div className="balance_weight_box" />
        
        {/* Original Content */}
        <div className="board_center_content_box">
          {/* 게시판 제목 */}
          <BoardTitle boardTitle={boardName} />

          {/* 게시판 내용 */}
          <div className="board_content_list_box">
            {boardContentList}
          </div>

          <Pagination 
            boardId={boardId}
            currentPageNum={currentPageNum}
            onPageChange={handlePageChange}
          />

          <div class="board_tail_box">
            <div className="board_post_edit_button" onClick={handlePostEditButtonclick}>
              <MdEdit />
              &nbsp;
              <span class="board_post_edit_button_text">작성하기</span>
            </div>
          </div>
        </div>
        <SidebarWidget />
      </div>
      <BottomNav />
    </div>
  );  
}

export default Board;
