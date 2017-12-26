import { fetchCommentDelete } from "../utils/readableApi";
export const DELETE_COMMENT = "DELETE_COMMENT";

function deleteComment(comment) {
    return {
        type: DELETE_COMMENT,
        comment
    }
}

function deleteCommentAsync(id) {    
    return dispatch => {
        fetchCommentDelete(id).then(res => res.json()).then(data => dispatch(deleteComment(data)));
    }
}

export default deleteCommentAsync;