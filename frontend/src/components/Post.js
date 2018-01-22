import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import Comment from "./Comment";
import upVotePostAsync from "../actions/upVotePost";
import deletePostAsync from "../actions/deletePost";
import downVotePostAsync from "../actions/downVotePost";
import getPostCommentsAsync from "../actions/getPostComments";
import FaArrowUp from "react-icons/lib/fa/arrow-up";
import FaArrowDown from "react-icons/lib/fa/arrow-down";
import FaTrashO from "react-icons/lib/fa/trash-o";
import FaPencil from "react-icons/lib/fa/pencil";
import posts from "../reducers/postsReducer";
import getPostAsync from "../actions/getPost";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {       
            author: "",
            body: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        return this.setState({[name]: value});
    }

    componentDidMount() {
        let postId = this.props.match.params.id
        postId ? this.props.getPost(this.props.match.params.id) : null;
        this.props.getComments(postId? this.props.match.params.id : this.props.post.id);
    }
  render() {
    const post  = this.props.post || this.props.parentPost || this.props.retrievedPost || {};
    return (
      <div className="postContainer">
        <div className="voteBox"> 
            <button className="upVote" onClick={() => { return this.props.upVotePost(post.id);}}>
                <FaArrowUp className="faArrowUp" size={12} />
            </button><br/>
                <span className="voteScore">{post.voteScore}</span><br/>
            <button className="downVote" onClick={() => { return this.props.downVotePost(post.id);}}>
                <FaArrowDown className="faArrowDown" size={12}/>
            </button><br/>
        </div>
        <Link className="postView" to={`/${post.category}/${post.id}`}>
          {post.title}
        </Link>
        <h6 className="postBody">{post.body}</h6>
        <p className="postAuthorInfo">submitted by {post.author} on {new Date(post.timestamp).toGMTString()} to {post.category}</p>
        <div className="postControlBox small">
            <p className="editPost">
                <Link  to={`/posts/${post.id}`}>
                    <FaPencil className="faPencil" size={12}/>
                </Link>
            </p>
            <p>
                <button className="deletePost" onClick={() => this.props.deletePost(post.id)}>
                    <FaTrashO className="faTrashO" size={12}/>
                </button>
            </p>
            <p className="commentCount">{post.commentCount} comments</p>
        </div>
        <hr className="commentSeparator"/>
        {this.props.displayComments && this.props.comments.map(comment => (
                <div key={comment.id} className="comments"><Comment comment={comment} post={post} /></div>
            ))}
      </div>
      
    );
  }
}
function mapStateToProps({posts}) {
    return { comments: posts.comments, retrievedPost: posts.post};
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
    },
    getPost: (id) => {
        dispatch(getPostAsync(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
