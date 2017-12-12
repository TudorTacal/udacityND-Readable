import { fetchPostsForCategory } from "../utils/readableApi";
export const GET_POSTS_FOR_CATEGORY = "GET_POSTS_FOR_CATEGORY";

function getPostsForCategory(postsForCategory) {
    return {
        type: GET_POSTS_FOR_CATEGORY,
        postsForCategory
    }
}

function getPostsForCategoryAsync(categoryPath) {
    return dispatch => {
        fetchPostsForCategory(categoryPath).then(res => res.json()).then(data => dispatch(getPostsForCategory(data )));
    }
}

export default getPostsForCategoryAsync;