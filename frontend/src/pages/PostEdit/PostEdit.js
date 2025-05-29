import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import DOMPurify from 'dompurify';

import { useAppContext } from "../DataContext";
import 'react-quill-new/dist/quill.snow.css';
import "./PostEdit.css"
import BoardTitle from "../../components/BoardTitle";

// 상단 헤더, 사이드바, 하단 네비게이션 등 공통 컴포넌트 import
import Header from '../../components/Header.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import SidebarWidget from '../../components/SidebarWidget.jsx';
import BottomNav from '../../components/BottomNav.jsx';

// 각 필요 스타일 import
import '../../styles/layout.css';
import '../../styles/global.css';

// 반응형 design import
import "../../styles/responsive.css";

function PostEdit() {
    const { addPost, getBoard, isValidBoardId } = useAppContext();
    const { boardId } = useParams();
    const navigate = useNavigate();  // useNavigate 훅 사용

    const [postTitleText, setpostTitleText] = useState("");
    const [postContentText, setpostContentText] = useState("");

    // postId가 없으면, board로 redirect
    if(!boardId) {
        navigate('/home');
        return null; // no rendering
    } else if (!isValidBoardId(boardId)) { // boardId가 존재하지 않는 id라면
        navigate('/home');
        return null; // no rendering
    } else if (boardId === "popular") {
        navigate('/home');
        return null; // no rendering
    }

    const boardName = getBoard(boardId).boardName;

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

        const newPost = { 
            postId: nanoid(), 
            boardId: boardId, 
            PostName: postTitleText, 
            Name: "aaaaa", 
            CreateTime: currentDateTime, 
            GoodCount: 0, 
            CommentCount: 0, 
            ViewCount: 0, 
            UserTagName: "학생", 
            PostContent: DOMPurify.sanitize(postContentText)
        };
        addPost(newPost)

        navigate('/board');
    }

    function handleCancleButtonClick(e) {
        setpostTitleText("");
        setpostContentText("");

        // 이전 page로
        navigate(-1);
    }

    return (
        <div className="postedit_root_box">
            <Header />
            <div className="sidebar-wrapper">
                <div className="sidebar-trigger" />
                <Sidebar />
            </div>

            <div className="post_main_content_box">
                <div className="balance_weight_box" />
                {/* Original Content */}
                <div>
                    <BoardTitle boardTitle={boardName}/>
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
                                <span>등록하기</span>
                            </div>
                            {/*취소 버튼*/}
                            <div className="cancle_button" onClick={handleCancleButtonClick}>
                                <span>취소하기</span>
                            </div>
                        </div>
                        {/* 100px의 공간을 화면 바닥으로 부터 띄우기 위한 div */}
                        <div className="post_tail_stub_box">

                        </div>
                    </div>
                </div>
                <SidebarWidget />
            </div>
            <BottomNav />
        </div>
    );
}

export default PostEdit;