import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
// import upVoteCommentAsync from "../actions/upVoteComment";
// import downVoteCommentAsync from "../actions/downVoteComment";

class Comment extends React.Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="comment">
        <p>{comment.body}</p>
        <span>Author: {comment.author}</span>
        <span>Time: {new Date(comment.timestamp).toGMTString()}</span>
        <span>Votes: {comment.voteScore}</span>
        <button
          onClick={() => {
            return this.props.upVoteComment(comment.id);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            return this.props.downVoteComment(comment.id);
          }}
        >
          -
        </button>
        <Link className="addComment" to="/comments">
          Add comment
        </Link>
        <Link className="editComment" to={`/comments/:${comment.id}`}>
          Edit comment
        </Link>
      </div>
    );
  }
}
function mapStateToProps(state) {
    const props = {};
    // const props = Object.assign({}, state, {
    //     comments: state.comments.comments
    // })
    return props;
}

function mapDispatchToProps(dispatch) {
  return {
    // upVoteComment: id => {
    //   dispatch(upVoteCommentAsync(id));
    // },
    // downVoteComment: id => {
    //   dispatch(downVoteCommentAsync(id));
    // }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
