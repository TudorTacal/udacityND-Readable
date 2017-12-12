import { fetchPostComments } from "../utils/readableApi";
export const GET_POST_COMMENTS = "GET_POST_COMMENTS";


function getPostComments(comments) {
    type: GET_POST_COMMENTS,
    comments
} 

function getPostCommentsAsync(id) {

    return dispatch => {
        fetchPostComments(id).then(res => res.json()).then(data => {console.log(data); return dispatch(getPostComments(data))});
    }
}

export default getPostCommentsAsync;