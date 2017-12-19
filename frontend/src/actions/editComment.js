import { fetchCommentUpdate } from "../utils/readableApi";
export const EDIT_COMMENT = "EDIT_COMMENT";

function editComment(commentData) {
    return {
        type: EDIT_COMMENT,
        comment: commentData
    }
}

function editCommentAsync(id, commentData) {
    return dispatch => {
        fetchCommentUpdate(id, commentData).then(res => res.json()).then(data => dispatch(editComment(data)));
    }
}

export default editCommentAsync;