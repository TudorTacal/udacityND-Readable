import React, { Compoenent } from "react";
import FaClose from "react-icons/lib/fa/close";
import { Link } from "react-router-dom";

function EditCommentForm(props){
        let commentId = props.match.params.id;
        let comment = props.comments.find(comment => comment.id == commentId); 
        console.log(comment);
        return (
            <form className="editCommentForm" onSubmit={(event) => event.preventDefault()}>
                <button style={{ color: 'black', float: "right", background: "none", border: 0 }} onClick={props.history.goBack}>
                    <FaClose style={{ float: "right" }} size={12} />
                </button>
                <div className="form-group">
                    <label htmlFor="editTitle">Edit comment</label><br />
                    <textarea placeholder="Body" name="body" onChange={props.onInputChange} defaultValue={comment.body} />
                </div>
                <input type="submit" value="Submit" onClick={() => {props.onSubmitClick(comment);props.history.goBack()}} />
            </form>
        )
    
}

export default EditCommentForm;

