import React, { Component } from "react";
import { Link } from "react-router-dom";

function PostsList(props) {
  return (
    <div className="posts">
      <ul>
        Posts:
        {props.posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <h4>{post.body}</h4>
            <p>Category: {post.category}</p>
            <p>Votes: {post.voteScore}</p>
            <button onClick={() => { return props.onClickUpVote(post.id)}}>+</button>
            <button onClick={() => { return props.onClickDownVote(post.id)}}>-</button>
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

export default PostsList;
