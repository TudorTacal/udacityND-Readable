import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { fetchPostComments } from "../utils/readableApi";
import PostForm from "./PostForm";
import Post from "./Post";

class PostsList extends React.Component {
  render() {
    return (
      <div className="posts">
        <ul>
          {this.props.posts.map(post => (
            <li className='post' key={post.id}>
              <Post post={post} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PostsList;
