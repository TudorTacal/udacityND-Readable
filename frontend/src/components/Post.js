import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import upVotePostAsync from "../actions/upVotePost";
import downVotePostAsync from "../actions/downVotePost";
import getPostCommentsAsync from "../actions/getPostComments";

class Post extends React.Component {
    componentDidMount() {
        console.log(this.props.post.id);
        return this.props.getComments(this.props.post.id);
    }
  render() {
    const { post } = this.props;
    return (
      <div>
        <Link className="postView" to={`/${post.category}/${post.id}`}>
          {post.title}
        </Link>
        {console.log(this.props.postComments)}
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
        <Link className="addPost" to="/posts">
          Add post
        </Link>
        <Link className="editPost" to={`/posts/:${post.id}`}>
          Edit post
        </Link>
        <p>Comments: {post.commentCount}</p>
      </div>
    );
  }
}
function mapStateToProps(state) {
    const props = Object.assign({}, state, {
        comments: state.comments
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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
