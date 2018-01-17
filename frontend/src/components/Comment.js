import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import deleteCommentAsync from "../actions/deleteComment";
import upVoteCommentAsync from "../actions/upVoteComment";
import downVoteCommentAsync from "../actions/downVoteComment";
import FaPencil from "react-icons/lib/fa/pencil";
import FaTrashO from "react-icons/lib/fa/trash-o";
import FaArrowUp from "react-icons/lib/fa/arrow-up";
import FaArrowDown from "react-icons/lib/fa/arrow-down";


class Comment extends React.Component {
    
  render() {
    const { comment } = this.props;
    return (
      <div className="comment">
        <div className="voteBox">
            <button className="upVote" onClick={() => { return this.props.upVoteComment(comment.id);}}>
                <FaArrowUp className="faArrowUp" size={12} />
            </button><br/>       
            <span className="voteScore">{comment.voteScore}</span><br/> 
            <button className="downVote" onClick={() => { return this.props.downVoteComment(comment.id);}}>
                <FaArrowDown className="faArrowDown" size={12}/>
            </button><br/>
        </div>
        <p>{comment.body}</p>
        <span>Author: {comment.author}</span>
        <span>Time: {new Date(comment.timestamp).toGMTString()}</span>
        <div className="commentControlBox small">
            <Link className="editComment" to={`/comments/${comment.id}`}>
                <FaPencil className="faPencil" size={12}/>
            </Link> 
            <button className="deleteComment" onClick={() => this.props.deleteComment(comment.id)}>
                <FaTrashO className="faTrashOComment" size={12}/>
            </button>  
        </div>     
      </div>
    );
  }
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

export default connect(null, mapDispatchToProps)(Comment);
