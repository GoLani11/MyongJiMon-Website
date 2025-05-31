import { useAppContext } from "../pages/DataContext.jsx";
import './Pagination.css'

function Pagination({ boardId, currentPageNum, onPageChange }) {
    const { getBoardPageCount } = useAppContext();

    // 총 page 수
    const totalPageNum = getBoardPageCount(boardId);

    // 페이지 번호 배열 생성
    const pageNumbers = [];
    for (let i = 1; i <= totalPageNum; i++) {
        pageNumbers.push(i);
    }

    // page 변경 handler
    const handlePageClick = (pageNum) => {
        if (pageNum !== currentPageNum) {
            onPageChange(pageNum);
        }
    };

    return(
        <div className="pagination">
            {/* 이전 페이지 버튼 */}
            <button
                onClick={() => handlePageClick(currentPageNum - 1)}
                disabled={currentPageNum === 1}
                className="pagination-button"
            >
                &laquo; {/* 왼쪽 화살표 */}
            </button>

            {/* 페이지 번호 버튼 */}
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => handlePageClick(number)}
                    className={`pagination-button ${number === currentPageNum ? 'active' : ''}`}
                >
                    {number}
                </button>
            ))}

            {/* 다음 페이지 버튼 */}
            <button
                onClick={() => handlePageClick(currentPageNum + 1)}
                disabled={currentPageNum === totalPageNum}
                className="pagination-button"
            >
                &raquo; {/* 오른쪽 화살표 */}
            </button>
        </div>
    );
}

export default Pagination;