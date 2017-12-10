import React, { Component } from "react";
import { Link } from "react-router-dom";
import { fetchPostComments } from "../utils/readableApi";

class PostsList extends React.Component {
  render() {
    return (
      <div className="posts">
        <ul>
          Posts:
          {this.props.posts.map(post => (
            <li key={post.id}>
              <h2>{post.title}</h2>
              <h4>{post.body}</h4>
              <p>Category: {post.category}</p>
              <p>Votes: {post.voteScore}</p>
              <button
                onClick={() => {
                  return this.props.onClickUpVote(post.id);
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  return this.props.onClickDownVote(post.id);
                }}
              >
                -
              </button>
              <p>Time: {new Date(post.timestamp).toGMTString()}</p>
              <p>Comments: </p>
              <Link className="addPost" to="/posts">
                Add post
              </Link>
              <Link className="editPost" to={`/posts/:${post.id}`}>
                Edit post
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PostsList;
