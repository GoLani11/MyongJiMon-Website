import './BoardTitle.css'

function BoardTitle({BoardTitle}) {
    return (
        <div className="board_title_box">
            <h1 className="board_title_text">{BoardTitle}</h1>
        </div>
    );
}

export default BoardTitle;