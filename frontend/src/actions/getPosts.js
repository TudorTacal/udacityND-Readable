import { fetchPosts } from "../utils/readableApi";
export const GET_POSTS = "GET_POSTS";

function getPosts(posts) {
    return {
        type: GET_POSTS,
        posts
    }
}

function getPostsAsync() {
    return dispatch => {
        fetchPosts().then(res => res.json()).then(data => dispatch(getPosts(data)));
    }
}

export default getPostsAsync;