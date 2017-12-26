import { fetchCommentVote } from "../utils/readableApi";

export const UP_VOTE_COMMENT = "UP_VOTE_COMMENT";

function upVoteComment(comment) {
  return {
    type: UP_VOTE_COMMENT,
    comment
  };
}

function upVoteCommentAsync(id) {
  return dispatch => {
    let option = { option: "upVote" };
    fetchCommentVote(id, option)
      .then(res => {
        return res.json();
      })
      .then(data => dispatch(upVoteComment(data)));
  };
}

export default upVoteCommentAsync;
