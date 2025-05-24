import './CommentEdit.css'
import React, { useState } from "react";

function Comment( {addComment}) {
    const [inputText, setInputText] = useState("");

    const handleInputTextChange = (e) => {
        setInputText(e.target.value);
    }

    function handleButtonclick(e) {
        const currentTimeDateObj = new Date();

        // 연도, 월, 일, 시간, 분, 초를 추출
        const year = currentTimeDateObj.getFullYear();
        const month = currentTimeDateObj.getMonth() + 1;  // 월은 0부터 시작하므로 1을 더해줘야 합니다.
        const day = currentTimeDateObj.getDate();
        const hours = currentTimeDateObj.getHours();
        const minutes = String(currentTimeDateObj.getMinutes()).padStart(2, '0');
        const seconds = String(currentTimeDateObj.getSeconds()).padStart(2, '0');

        // mysql의 current_timestamp 형식과 일치하는 형태로 가공
        const currentDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        
        addComment(currentDateTime, inputText);
        setInputText("");
    }

    return (
        <div className="comment_edit_box">
            <textarea 
                className="comment_edit_textarea"
                onChange={handleInputTextChange}
                value={inputText}
            />
            <img 
                className="comment_edit_box_send_icon" 
                src="/imgs/send_icon.png" 
                alt="comment edit button"
                onClick={handleButtonclick}
            />
        </div>
    );
}

export default Comment;