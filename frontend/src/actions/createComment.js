import { fetchCommentCreate } from "../utils/readableApi";
import uuidv4  from 'uuid/v4';
export const CREATE_COMMENT = "CREATE_COMMENT";

function createPost(commentData) {
    return {
        type: CREATE_COMMENT,
        commentData
    }
}

function createCommentAsync(parentId, commentData) {
    console.log(commentData);
    return dispatch => {
        let comment = Object.assign({}, commentData, {id: uuidv4(), parentId, timestamp: Date.now() })
        console.log(comment);
        fetchCommentCreate(comment).then(res => res.json()).then(data => dispatch(createPost(data)) );
    }
}

export default createCommentAsync;