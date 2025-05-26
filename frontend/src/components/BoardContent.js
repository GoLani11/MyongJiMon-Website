import './BoardContent.css';
import UserTag from './UserTag';

function BoardContent({ PostName, Name, CreateTime, GoodCount, CommentCount, UserTagName, onGoodCountClick, onContentClick}) {
    return (
        <div className="board_content_box">
            <div className="board_content_metadata_box">
                <div className="board_content_metadata_box_1">
                    <img className="board_content_persion_icon" src="/imgs/person_icon.jpg" alt="anonymous person icon" />
                    <span>{Name}</span><span>{CreateTime}</span>
                </div>
                <div className="board_content_metadata_box_2">
                    <img 
                        className="board_content_metadata_box_2_good_icon" 
                        src="/imgs/good_icon.png" 
                        alt="good_count"
                        onClick={onGoodCountClick}
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
            {PostName}
        </span>
        <UserTag UserTagName={UserTagName}/>
      </div>
    )
}

export default BoardContent;