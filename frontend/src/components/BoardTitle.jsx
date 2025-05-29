import "./BoardTitle.css";

function BoardTitle({boardTitle}) {
    return (
        <div className="board_title_box">
            <h1 className="board_title_text">{boardTitle}</h1>
        </div>
    );
}

export default BoardTitle;