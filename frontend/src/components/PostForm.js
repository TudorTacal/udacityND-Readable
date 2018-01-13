import React, { Compoenent } from "react";
import FaClose from "react-icons/lib/fa/close";
import { Link } from "react-router-dom";

function PostForm(props) {
  return (
    <form className={`${props.type}Form`} onSubmit={event => event.preventDefault()}>
        <Link style={{color: 'black'}}to="/">
            <FaClose style={{float: "right"}} size={12}/>
        </Link>
        <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
                className="form-control"
                id="title"
                type="text"
                placeholder="Enter title"
                name="title"
                onChange={props.onInputChange}
            />
        </div>
        <div className="form-group">
            <label htmlFor="body">Post body</label><br/>
            <textarea placeholder="Enter post body" name="body" id="body"  onChange={props.onInputChange} />
         </div>
         <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
                className="form-control"  
                id="author"            
                type="text"
                placeholder="Author"
                name="author"
                onChange={props.onInputChange}
             />
         </div>
         <div className="form-group">
            <label htmlFor="author">Category</label>
            <input
                className="form-control"              
                type="text"
                placeholder="Enter a category: react, redux or udacity"
                name="category"
                onChange={props.onInputChange}
            />
        </div>
      <button className="btn btn-primary" type="submit" value="Submit" onClick={props.onSubmitClick}>
        Submit
      </button>
    </form>
  );
}

export default PostForm;
