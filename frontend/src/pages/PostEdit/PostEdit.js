import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';
import "./PostEdit.css"
import BoardTitle from "../../components/BoardTitle";

function PostEdit( {boardTitle, addPost}) {
    const [postTitleText, setpostTitleText] = useState("");
    const [postContentText, setpostContentText] = useState("");

    const handleInputTitleTextChange = (e) => {
        setpostTitleText(e.target.value);
    }

    const handleInputContentTextChange = (value) => {
        setpostContentText(value);
    }

    function handleRegisterButtonClick(e) {
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

        addPost(boardTitle, currentDateTime, postTitleText, postContentText)
    }

    function handleCancleButtonClick(e) {
        {/* 복귀 codes */}

        setpostTitleText("");
        setpostContentText("");
    }

    return (
        <div>
            <BoardTitle BoardTitle={boardTitle}/>
            <div className="post_edit_box">
                <div className="post_title_box">
                    <p className="sub_box_title">제목</p>
                    <textarea
                        className="post_title_input_box"
                        onChange={handleInputTitleTextChange}
                        value={postTitleText}
                        placeholder="제목을 입력하세요"
                    ></textarea>
                </div>
                {/* 편집기 */}
                <div className="post_content_box">
                    <p className="sub_box_title">본문</p>
                    <ReactQuill
                        onChange={handleInputContentTextChange}
                        theme="snow"
                        placeholder="내용을 입력하세요"
                        modules={{
                            toolbar: [
                                [{ 'header': '1'}, { 'header': '2'}, { 'font': [] }],
                                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                ['bold', 'italic', 'underline'],
                                [{ 'align': [] }],
                            ]
                        }}
                    />
                </div>
                <div className="post_button_box">
                    {/*등록 버튼*/}
                    <div className="button" onClick={handleRegisterButtonClick}>
                        <span>등록</span>
                    </div>
                    {/*취소 버튼*/}
                    <div className="button" onClick={handleCancleButtonClick}>
                        <span>취소</span>
                    </div>
                </div>
                {/* 100px의 공간을 화면 바닥으로 부터 띄우기 위한 div */}
                <div className="post_tail_stub_box">

                </div>
            </div>
        </div>
    );
}

export default PostEdit;