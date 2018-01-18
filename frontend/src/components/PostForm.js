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
            <select className="btn btn-secondary dropdown-toggle" defaultValue="default" name="category" onChange={props.onInputChange}>
                <option disabled="true" value="default" >Category</option>
                <option className="dropdown-item" >react</option>
                <option className="dropdown-item" >redux</option>
                <option className="dropdown-item" >udacity</option>
            </select>
         </div>
      <button className="btn btn-primary" type="submit" value="Submit" onClick={props.onSubmitClick}>
        Submit
      </button>
    </form>
  );
}

export default PostForm;
