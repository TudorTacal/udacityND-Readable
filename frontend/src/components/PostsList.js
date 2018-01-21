import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { fetchPostComments } from "../utils/readableApi";
import PostForm from "./PostForm";
import Post from "./Post";

class PostsList extends React.Component {
  render() {
    let category = this.props.match.params.category;
    let posts = category ? this.props.posts.filter(post => post.category === category)
                         : this.props.posts;
    return (
      <div className="posts">
        <ul>
          {posts.map(post => (
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
