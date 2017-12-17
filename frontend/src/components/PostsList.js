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
          Posts:
          {this.props.posts.map(post => (
            <li key={post.id}>
              <Post post={post} onClickUpVote={this.props.upVotePost} onClickDownVote={this.props.downVotePost}/>
              <Link className="addPost" to="/posts">
                 Add post
              </Link>
              <br />
              <br />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default PostsList;
