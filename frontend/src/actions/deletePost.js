import { fetchPostDelete } from "../utils/readableApi";
export const DELETE_POST = "DELETE_POST";

function deletePost(post) {
    return {
        type: DELETE_POST,
        post
    }
}

function deletePostAsync(id) {    
    return dispatch => {
        fetchPostDelete(id).then(res => res.json()).then(data => {console.log(data); return dispatch(deletePost(data))});
    }
}

export default deletePostAsync;