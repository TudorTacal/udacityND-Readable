import { fetchPosts, fetchCategories } from "../utils/readableApi";
export const GET_CATEGORIES = "GET_CATEGORIES";

function getCategories(categories) {
    return {
        type: GET_CATEGORIES,
        categories
    }
}

function getCategoriesAsync() {
    return dispatch => {
        fetchCategories().then(res => res.json()).then(data => {dispatch(getCategories(data.categories))});
    }
}

export default getCategoriesAsync;