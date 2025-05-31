import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import { useNavigate, useSearchParams } from 'react-router-dom';
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
    const { user, getUserTag, addPost, getBoard, isValidBoardId, getFormattedDateTime } = useAppContext();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();  // useNavigate 훅 사용

    const [postTitleText, setpostTitleText] = useState("");
    const [postContentText, setpostContentText] = useState("");

    // query parameter 가져오기 e.g. ?key=value
    const boardId = searchParams.get('board');

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
        const newPost = { 
            postId: nanoid(), 
            boardId: boardId, 
            PostName: postTitleText, 
            Name: user.username, 
            CreateTime: getFormattedDateTime(), 
            GoodCount: 0, 
            CommentCount: 0, 
            ViewCount: 0, 
            UserTagName: getUserTag(user.type), 
            PostContent: DOMPurify.sanitize(postContentText)
        };
        addPost(newPost)

        navigate(`/board/${boardId}`);
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

            <div className="post_edit_main_content_box">
                <div className="balance_weight_box" />
                {/* Original Content */}
                <div className="post_edit_center_content_box">
                    <BoardTitle boardTitle={boardName}/>
                    <div className="post_edit_box">
                        <div className="post_title_box">
                            <p className="sub_box_title">제목</p>
                            <textarea
                                className="post_title_input_box"
                                onChange={handleInputTitleTextChange}
                                value={postTitleText}
                                placeholder="제목을 입력하세요"
                            />
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