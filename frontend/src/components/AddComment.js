import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import createCommentAsync from "../actions/createComment";
Modal.setAppElement("body");

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      commentModalOpen: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openCommentModal = this.openCommentModal.bind(this);
    this.closeCommentModal = this.closeCommentModal.bind(this);
  }
  handleSubmit(parentId) {
    const values = this.state;
    delete values.commentModalOpen;
    this.props.createComment(parentId, values);
  }
  openCommentModal() {
    return this.setState({ commentModalOpen: true });
  }
  closeCommentModal() {
    return this.setState({ commentModalOpen: false });
  }
  render() {
    return (
      <div>
        <button onClick={() => this.openCommentModal()}>Add Comment</button>
        <Modal
          isOpen={this.state.commentModalOpen}
          onRequestClose={this.closeCommentModal}
        >
          <form onSubmit={event => event.preventDefault()}>
            Add comment
            <textarea
              placeholder="Body"
              name="body"
              onChange={this.handleInputChange}
            />
            <input
              type="text"
              placeholder="Author"
              name="author"
              onChange={this.handleInputChange}
            />
            <input
              type="submit"
              value="Submit"
              onClick={parentId => this.handleSubmit(this.props.post.id)}
            />
          </form>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const props = {};
  return props;
}

function mapDispatchToProps(dispatch) {
  return {
    createComment: (parentId, values) => {
      dispatch(createCommentAsync(parentId, values));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
