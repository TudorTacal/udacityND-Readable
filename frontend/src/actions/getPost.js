import { fetchPost } from "../utils/readableApi";
export const GET_POST = "GET_POST";

function getPost(post) {
    return {
        type: GET_POST,
        post
    }
}

function getPostAsync(id) {
    return dispatch => {
        fetchPost(id).then(res => res.json()).then(data => dispatch(getPost(data)));
    }
}

export default getPostAsync;