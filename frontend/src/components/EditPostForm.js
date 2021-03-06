import React, { Compoenent } from "react";
import FaClose from "react-icons/lib/fa/close";
import { Link } from "react-router-dom";

class EditPostForm extends React.Component{
    render() {
        let postId = this.props.match.params.id;
        let post = this.props.posts.find(post => post.id == postId);
        return (
            <form className={`${this.props.type}Form`} onSubmit={event => event.preventDefault()}>
                <Link style={{color: 'black'}}to="/">
                    <FaClose style={{float: "right"}} size={12}/>
                </Link>
                <div className="form-group">
                    <label htmlFor="editTitle">Title</label><br/>
                    <input
                        className="editTitleInput"
                        type="text"
                        name="title"
                        id="editTitle"
                        defaultValue={post.title}
                        onChange={this.props.onInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="editTitle">Body</label><br/>
                    <textarea name="body" className="editBodyTextArea" onChange={this.props.onInputChange} defaultValue={post.body}/>
                </div>
            <Link className="btn btn-primary" to="" type="submit" value="Submit" onClick={() => {this.props.onSubmitClick(post);this.props.history.goBack()}} >
                Submit
            </Link>
            </form>
        );
    }
}

export default EditPostForm;
