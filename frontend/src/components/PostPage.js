import React, { Component } from "react";
import Post from "./Post";

class PostPage extends React.Component {
  render() {
    let postId = this.props.match.params.id;
    let post = this.props.posts.find(post => post.id == postId);
    return (
      <div >
          <Post parentPost={post} displayComments={true} {...this.props}/>
      </div>
    );
  }
}

export default PostPage;
