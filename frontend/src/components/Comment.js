import "./Comment.css";
import UserTag from "./UserTag";

function Comment( { commentOwner, UserTagName, commentCreateTime, commentGoodCount, onGoodCountClick, commentText }) {
    return (
        <div className="comment_box">
            <div className="comment_metadata_box">
                <div className="comment_metadata_box_1">
                    <img 
                        className="comment_persion_icon" 
                        src="/imgs/person_icon.jpg" 
                        alt="anonymous person icon" 
                    />
                    <span>{commentOwner}</span><span>{commentCreateTime}</span>
                </div>
                <div className="comment_metadata_box_2">
                    <img 
                        className="comment_metadata_box_2_good_icon" 
                        src="/imgs/good_icon.png" 
                        alt="good_count"
                        onClick={onGoodCountClick}
                    />
                    <span>{commentGoodCount}</span>
                </div>
            </div>
        {commentText}
        <UserTag UserTagName={UserTagName}/>
      </div>
    );
}

export default Comment;