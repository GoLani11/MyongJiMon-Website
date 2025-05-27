import './PostView.css'
import UserTag from './UserTag';

function PostView( { BoardTitle, PostName, Name, CreateTime, GoodCount, ViewCount, UserTagName, onGoodCountClick, onBackToBoardClick, PostContent} ) {
    return (
        <div className="post_view_box">
            <div className="post_head_box">
                <p className="commnunity_info">커뮤니티 / <span className="board_title" onClick={onBackToBoardClick}>{BoardTitle}</span></p>
                <div className="post_head_metadata_box">
                    <img 
                        className="person_icon" 
                        src="/imgs/person_icon.jpg" 
                        alt="persion icon"
                    />
                    <div className="post_head_text_box">
                        <span className="post_owner">{Name}</span>
                        <span className="metadata">{CreateTime} ➿{ViewCount}</span>
                    </div>
                </div>
            </div>
            <div className="post_body_box">
                <h1>{PostName}</h1>
                <span dangerouslySetInnerHTML={{__html: PostContent}}/>
            </div>
            <div className="post_tail_box">
                <UserTag UserTagName={UserTagName}/>
                <div className="good_box">
                    <img 
                        className="good_icon"
                        src="/imgs/good_icon_blue.png"
                        alt="good icon"
                        onClick={onGoodCountClick}
                    />
                    <p className="good_count">{GoodCount}</p>
                </div>
            </div>
        </div>
    );
}

export default PostView;