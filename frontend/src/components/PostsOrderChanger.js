import React, { Component } from "react";

function PostsOrderChanger(props) {
  return (
    <div className="postsOrderChanger">
      <select
        defaultValue={props.postOrderBy || "none"}
        onChange={event => {
          props.onChangeHandler(event.target.value);
        }}
      >
        <option value="none" disabled>
          Sort by...
        </option>
        <option value="voteScore">Vote Score</option>
        <option value="timestamp">Timestamp</option>
      </select>
    </div>
  );
}

export default PostsOrderChanger;
