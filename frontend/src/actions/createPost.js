import { fetchPostPost } from "../utils/readableApi";
import uuidv4  from 'uuid/v4';
export const CREATE_POST = "CREATE_POST";

function createPost(postData) {
    return {
        type: CREATE_POST,
        postData
    }
}

function createPostAsync(postData) {
    return dispatch => {
        let post = Object.assign({}, postData, {id: uuidv4(), timestamp: Date.now() })
        fetchPostPost(post).then(res => res.json()).then(data => {console.log(data); return dispatch(createPost(data)) });
    }
}

export default createPostAsync;