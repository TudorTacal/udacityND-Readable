import { fetchCommentCreate } from "../utils/readableApi";
import uuidv4  from 'uuid/v4';
export const CREATE_COMMENT = "CREATE_COMMENT";

function createComment(commentData) {
    return {
        type: CREATE_COMMENT,
        comment: commentData
    }
}

function createCommentAsync(parentId, commentData) {
    return dispatch => {
        let comment = Object.assign({}, commentData, {id: uuidv4(), parentId, timestamp: Date.now() })
        fetchCommentCreate(comment).then(res => res.json()).then(data => dispatch(createComment(data)) );
    }
}

export default createCommentAsync;