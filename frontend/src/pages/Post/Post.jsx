import { nanoid } from 'nanoid';
import { useParams, Navigate } from 'react-router-dom';

import { useAppContext } from "../DataContext";
import BoardTitle from '../../components/BoardTitle';
import PostView from '../../components/PostView';
import CommentEdit from '../../components/CommentEdit';
import Comment from '../../components/Comment';

function Post({boardTitle}) {
    const { comments, setComments, updatePost, getPost } = useAppContext();
    const { postId } = useParams();

    // postId가 없으면, board로 redirect
    if(!postId) {
        Navigate('/board')
        return null; // no rendering
    } 
    
    const post = getPost(postId);

    function timeAgo(inputDateTime) {
        const currentTime = new Date();
        const inputDate = new Date(inputDateTime);

        // 두 날짜 간의 차이 (밀리초 단위)
        const diffInSeconds = Math.floor((currentTime - inputDate) / 1000);
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInSeconds < 60) {
        return `${diffInSeconds}초 전`;
        } else if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`;
        } else if (diffInHours < 24) {
        return `${diffInHours}시간 전`;
        } else if (diffInDays < 365) {
        return `${diffInDays}일 전`;
        } else {
        return `${Math.floor(diffInDays / 365)}년 전`;
        }
    };

    function addComment(commentCreateTime, commentText)  {
        const newComment = { 
            commentId: nanoid(),
            postId: post.postId,
            commentOwner: "test",
            UserTagName: "학생",
            commentCreateTime: commentCreateTime,
            commentGoodCount: 0,
            commentText: commentText
        }
        
        /* CommentCount 갱신 */
        /* 선택된 post는 post를 통해 알 수 있다 */
        const updatedPost = { ...post, CommentCount: post.CommentCount + 1};
        // setPosts((prevPosts) => /*함수형 update는 첫번째 인자가 이전상태값 */
        //     prevPosts.map((post) =>
        //         post.postId === post.postId ? updatedPost : post
        //     )
        // );
        
        updatePost(updatedPost);
        addComment(newComment);
    }

    const commentList = comments
        // .filter((comment) => comment.postId === post.postId)
        .filter((comment) => comment.postId === post.postId)
        .map((comment) => 
            <Comment
                key = {comment.commentId}
                commentOwner={comment.commentOwner}
                UserTagName={comment.UserTagName}
                commentCreateTime={timeAgo(comment.commentCreateTime)}
                commentGoodCount={comment.commentGoodCount}
                commentText={comment.commentText}
                onGoodCountClick={() => handleCommentGoodCount(comment.commentId)}
            />
        );
    
    const handlePostGoodCount = (postId) => {
        // const tempPost = posts.map((post) => {
        //     if (post.postId === postId) {
        //         return { ...post, GoodCount: post.GoodCount + 1 };
        //     }
        //     return post;
        // });
        const tempPost = { ...post, GoodCount: post.GoodCount + 1 };
        updatePost(tempPost);
    };

    const handleCommentGoodCount = (commentId) => {
        const tempComment = comments.map((comment) => {
            if (comment.commentId === commentId) {
                return { ...comment, commentGoodCount: comment.commentGoodCount + 1 };
            }
            return comment;
        });
        setComments(tempComment);
    };

    return (
        <div>
            <BoardTitle boardTitle={boardTitle}/>
            <PostView
                key = {post?.postId}
                BoardTitle={boardTitle}
                PostName={post?.PostName} 
                Name={post?.Name}
                ViewCount={post?.ViewCount}
                CreateTime={post?.CreateTime}
                GoodCount={post?.GoodCount}
                UserTagName={post?.UserTagName}
                PostContent={post?.PostContent}
                // onGoodCountClick={() => handlePostGoodCount(post?.postId)}
                onGoodCountClick={() => handlePostGoodCount()}
                // onBackToBoardClick={onBackToBoardClick}
            />
            <CommentEdit addComment={addComment}/>
            {commentList}
        </div>
    );

}

export default Post;