import React, { Component } from "react";

class PostsOrderChanger extends React.Component {
    render() {
        return (
        <div className="postsOrderChanger">
            <select defaultValue={this.props.postOrderBy || "none"} onChange={(event) => {this.props.onChangeHandler(event.target.value)}}>
                <option value="none" disabled>Sort by...</option>
                <option value="voteScore">Vote Score</option> 
                <option value="timestamp">Timestamp</option>
            </select>
         </div>
        )
    }
}

export default PostsOrderChanger