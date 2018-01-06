import React, { Component } from "react";

function PostsOrderChanger(props) {
  return (
    <div className="postsOrderChanger">
      <select className="sortBox"
        defaultValue={props.postOrderBy || "none"}
        onChange={event => {
          props.onChangeHandler(event.target.value);
        }}
      >
        <option className="sortBoxOption" value="none" disabled>
          Sort by...
        </option>
        <option className="sortBoxOption" value="voteScore">Vote Score</option>
        <option className="sortBoxOption" value="timestamp">Timestamp</option>
      </select>
    </div>
  );
}

export default PostsOrderChanger;
