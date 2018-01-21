import React, { Component } from "react";
import Post from "./Post";

class PostPage extends React.Component {
  render() {
    let postId = this.props.match.params.id;
    let post = this.props.posts.find(post => post.id == postId);
    return (
      <div >
          <Post post={post} displayComments={true}/>
      </div>
    );
  }
}

export default PostPage;
