import { fetchPostUpdate } from "../utils/readableApi";
export const EDIT_POST = "EDIT_POST";

function editPost(postData) {
    return {
        type: EDIT_POST,
        post: postData
    }
}

function editPostAsync(id, postData) {
    return dispatch => {
        fetchPostUpdate(id, postData).then(res => res.json()).then(data => dispatch(editPost(data)));
    }
}

export default editPostAsync;