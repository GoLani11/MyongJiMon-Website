import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

import './BoardContent.css';
import UserTag from './UserTag';

function BoardContent({ postId, PostName, Name, CreateTime, GoodCount, CommentCount, UserTagName, onContentClick}) {
    return (
        <div className="board_content_box">
            <div className="board_content_metadata_box">
                <div className="board_content_metadata_box_1">
                    {/* <img className="board_content_persion_icon" src="/imgs/person_icon.jpg" alt="anonymous person icon" /> */}
                    <FaUserCircle size={42.465} />
                    <span>{Name}</span><span>{CreateTime}</span>
                </div>
                <div className="board_content_metadata_box_2">
                    <img 
                        className="board_content_metadata_box_2_good_icon" 
                        src="/imgs/good_icon.png" 
                        alt="good_count"
                    />
                    <span>{GoodCount}</span>
                    <img 
                        className="board_content_metadata_box_2_comment_icon" 
                        src="/imgs/comment_icon.png" 
                        alt="comment_count" 
                    />
                    <span>{CommentCount}</span>
                </div>
            </div>
            <span 
                className="board_content_box_postname" 
                onClick={onContentClick} 
            >
                <Link 
                    className="board_content_post_title" 
                    to={`/post/${postId}`}>{PostName}
                </Link>
            </span>
            <UserTag UserTagName={UserTagName}/>
      </div>
    )
}

export default BoardContent;