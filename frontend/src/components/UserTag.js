import './UserTag.css'

function UserTag({UserTagName}) {
    return (
        <div className="user_tag_box"><span className="user_tag">#{UserTagName}</span></div>
    );
}

export default UserTag;