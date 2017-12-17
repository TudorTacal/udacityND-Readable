import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import Comment from "./Comment";
import upVotePostAsync from "../actions/upVotePost";
import deletePostAsync from "../actions/deletePost";
import downVotePostAsync from "../actions/downVotePost";
import getPostCommentsAsync from "../actions/getPostComments";

class Post extends React.Component {
    componentWillMount() {
        return this.props.getComments(this.props.post.id);
    }
  render() {
    const { post } = this.props;
    return (
      <div>
        <Link className="postView" to={`/${post.category}/${post.id}`}>
          {post.title}
        </Link>
        <h4>{post.body}</h4>
        <p>Author: {post.author}</p>
        <p>Time: {new Date(post.timestamp).toGMTString()}</p>
        <p>Category: {post.category}</p>
        <p>Votes: {post.voteScore}</p>
        <button
          onClick={() => {
            return this.props.upVotePost(post.id);
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            return this.props.downVotePost(post.id);
          }}
        >
          -
        </button>
        <Link className="editPost" to={`/posts/${post.id}`}>
          Edit post
        </Link>
        <button className="deletePost" onClick={() => this.props.deletePost(post.id)}>
          Delete post
        </button>
        <p>{post.commentCount} comments</p>
        {this.props.displayComments && this.props.comments.map(comment => (
            <div key={comment.id} className="comments"><Comment comment={comment} /></div>
        ))}
      </div>
    );
  }
}
function mapStateToProps(state) {
    const props = Object.assign({}, state, {
        comments: state.posts.comments
    })
    return props;
}

function mapDispatchToProps(dispatch) {
  return {
    upVotePost: id => {
      dispatch(upVotePostAsync(id));
    },
    downVotePost: id => {
      dispatch(downVotePostAsync(id));
    },
    getComments: id => {
        dispatch(getPostCommentsAsync(id));
    },
    deletePost: (id) => {
        dispatch(deletePostAsync(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
