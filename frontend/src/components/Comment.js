import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import deleteCommentAsync from "../actions/deleteComment";
import upVoteCommentAsync from "../actions/upVoteComment";
import downVoteCommentAsync from "../actions/downVoteComment";

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
        <Link className="editComment" to={`/comments/${comment.id}`}>
          Edit comment
        </Link>
        <button className="deleteComment" onClick={() => this.props.deleteComment(comment.id)}>
          Delete comment
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
    const props = {};
    return props;
}

function mapDispatchToProps(dispatch) {
  return {
      deleteComment: id => {
          dispatch(deleteCommentAsync(id));
      },
    upVoteComment: id => {
      dispatch(upVoteCommentAsync(id));
    },
    downVoteComment: id => {
      dispatch(downVoteCommentAsync(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
