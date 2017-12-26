import { fetchCommentVote } from "../utils/readableApi";

export const DOWN_VOTE_COMMENT = "DOWN_VOTE_COMMENT";

function downVoteComment(comment) {
  return {
    type: DOWN_VOTE_COMMENT,
    comment
  };
}

function downVoteCommentAsync(id) {
  return dispatch => {
    let option = { option: "downVote" };
    fetchCommentVote(id, option)
      .then(res => {
        return res.json();
      })
      .then(data => dispatch(downVoteComment(data)));
  };
}

export default downVoteCommentAsync;
