import { fetchPostVote } from "../utils/readableApi";

export const DOWN_VOTE_POST = "DOWN_VOTE_POST";

function downVotePost(post) {
    return {
        type: DOWN_VOTE_POST,
        post
    }
}

function downVotePostAsync(id) {
    return dispatch => {
        let option = {option: "downVote"};
        fetchPostVote(id, option).then(res => { return res.json()}).then(data =>  dispatch(downVotePost(data)));
    }
}

export default downVotePostAsync;