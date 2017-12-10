import React, { Compoenent } from 'react';

class PostForm extends React.Component {
    render() {
        return (
            <form className={`${this.props.type}form`}>Add post
                <input type="text" placeholder="Title" name="title" onChange={this.props.onInputChange} />
                <textarea placeholder="Body" name="body" onChange={this.props.onInputChange}/>
                <input type="text" placeholder="Author" name="author" onChange={this.props.onInputChange}/>
                <input type="text" placeholder="Category: react, redux or udacity" name="category" onChange={this.props.onInputChange}/>
                <input type="submit" value="Submit" onClick={this.props.onSubmitClick} />
            </form>
        )
    }
}

export default PostForm;