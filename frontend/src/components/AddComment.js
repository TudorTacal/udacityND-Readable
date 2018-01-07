import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import createCommentAsync from "../actions/createComment";
import { Link } from "react-router-dom";
import FaClose from "react-icons/lib/fa/close";
Modal.setAppElement("body");

class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {           
         body: "",
         author: "",
         commentModalOpen: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openCommentModal = this.openCommentModal.bind(this);
    this.closeCommentModal = this.closeCommentModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);    
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
        [name]: value
      });
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
            style={{
                     overlay: {
                        position          : 'fixed',
                        top               : 0,
                        left              : 0,
                        right             : 0,
                        bottom            : 0,
                        backgroundColor   : 'rgba(255, 255, 255, 0.75)',
                        width: "70%",
                        margin: "0 auto",
                        }
                    }}   
          isOpen={this.state.commentModalOpen}
          onRequestClose={this.closeCommentModal}
        >
          <form className="addCommentForm" onSubmit={event => event.preventDefault()}>
          <Link style={{color: 'black'}}to="/">
            <FaClose style={{float: "right"}} size={12}/>
          </Link>
          <div className="form-group">
            <label htmlFor="editCommentBody">Comment</label><br/>
            <textarea
              placeholder="Enter comment"
              className="addCommentInput"              
              id="edithCommentBody"
              name="body"
              onChange={this.handleInputChange}
            />
            </div>
            <div className="form-group">   
                <label htmlFor="editCommentAuthor">Author</label><br/>     
                <input
                    className="addCommentInput"
                    type="text"
                    placeholder="Enter author"
                    name="author"
                    id="eidtCommentAuthor"
                    onChange={this.handleInputChange}
                />
            </div>
            <button className="btn btn-primary" to="/" type="submit" value="Submit" onClick={parentId => {this.handleSubmit(this.props.post.id); this.closeCommentModal()}} >
                Submit
            </button>
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
