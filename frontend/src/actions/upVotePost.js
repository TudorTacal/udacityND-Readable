import { fetchPostVote } from "../utils/readableApi";

export const UP_VOTE_POST = "UP_VOTE_POST";

function upVotePost(post) {
  return {
    type: UP_VOTE_POST,
    post
  };
}

function upVotePostAsync(id) {
  return dispatch => {
    let option = { option: "upVote" };
    fetchPostVote(id, option)
      .then(res => {
        return res.json();
      })
      .then(data => dispatch(upVotePost(data)));
  };
}

export default upVotePostAsync;
