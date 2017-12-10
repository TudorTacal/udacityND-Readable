import React, { Component } from "react";
import { Link } from "react-router-dom";

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
              <p>Time: {new Date(post.timestamp).toGMTString()}</p>
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
