import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import { connect } from "react-redux";
import Comment from "./Comment";
import upVotePostAsync from "../actions/upVotePost";
import deletePostAsync from "../actions/deletePost";
import downVotePostAsync from "../actions/downVotePost";
import getPostCommentsAsync from "../actions/getPostComments";
import createCommentAsync from "../actions/createComment";
import Modal from "react-modal";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {       
            author: "",
            body: "",
            commentModalOpen: false
        };
        this.openCommentModal = this.openCommentModal.bind(this);
        this.closeCommentModal = this.closeCommentModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(parentId) {
        const values = this.state;
        delete values.commentModalOpen;
        this.props.createComment(parentId, values);    
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        return this.setState({[name]: value});
    }
    openCommentModal() {
        return this.setState({commentModalOpen: true});
    }
    closeCommentModal() {
        return this.setState({commentModalOpen: false});
    }
    componentWillMount() {
        return this.props.getComments(this.props.post.id);
    }
  render() {
    const { post } = this.props;
    return (
      <div>
        <Link className="postView" to={`/${post.category}/${post.id}`}>
          {post.title}
        </Link>
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
        <Link className="editPost" to={`/posts/${post.id}`}>
          Edit post
        </Link>
        <button className="deletePost" onClick={() => this.props.deletePost(post.id)}>
          Delete post
        </button>
        <p>{post.commentCount} comments</p>
        {this.props.displayComments && this.props.comments.map(comment => (
            <div key={comment.id} className="comments"><Comment comment={comment} /></div>
        ))}
        <button onClick={() => this.openCommentModal()} >Add Comment</button>
        <Modal 
            isOpen={this.state.commentModalOpen}
            onRequestClose={this.closeCommentModal}
            >
             <form onSubmit={(event) => event.preventDefault() }>
             Add comment
                <textarea placeholder="Body" name="body" onChange={this.handleInputChange}/>
                <input
                    type="text"
                    placeholder="Author"
                    name="author"
                    onChange={this.handleInputChange}
                />
                <input type="submit" value="Submit" onClick={(parentId) => this.handleSubmit(post.id)} />
            </form>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
    const props = Object.assign({}, state, {
        comments: state.posts.comments
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
    },
    deletePost: (id) => {
        dispatch(deletePostAsync(id));
    },
    createComment: (parentId, values) => {
        dispatch(createCommentAsync(parentId, values))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
