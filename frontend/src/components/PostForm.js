import React, { Compoenent } from "react";

function PostForm(props) {
  return (
    <form className={`${props.type}form`}>
      Add post
      <input
        type="text"
        placeholder="Title"
        name="title"
        onChange={props.onInputChange}
      />
      <textarea placeholder="Body" name="body" onChange={props.onInputChange} />
      <input
        type="text"
        placeholder="Author"
        name="author"
        onChange={props.onInputChange}
      />
      <input
        type="text"
        placeholder="Category: react, redux or udacity"
        name="category"
        onChange={props.onInputChange}
      />
      <input type="submit" value="Submit" onClick={props.onSubmitClick} />
    </form>
  );
}

export default PostForm;
