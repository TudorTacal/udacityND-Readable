import React, { Compoenent } from "react";

function EditPostForm(props) {
  return (
    <form className={`${props.type}form`} onSubmit={event => event.preventDefault()}>
      Edit post
      <input
        type="text"
        placeholder="Title"
        name="title"
        defaultValue={props.post.title}
        onChange={props.onInputChange}
      />
      <textarea placeholder="Body" name="body" onChange={props.onInputChange} defaultValue={props.post.body}/>
      <input type="submit" value="Submit" onClick={props.onSubmitClick} />
    </form>
  );
}

export default EditPostForm;
