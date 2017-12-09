import React, { Component } from "react";
import { connect } from "react-redux";
import * as api from "../utils/readableApi";
import getPostsAsync from "../actions/getPosts";
import getCategoriesAsync from "../actions/getCategories";
import createPostAsync from "../actions/createPost";
import { fetchPosts } from "../utils/readableApi";
import { Route, Router, Link, history, withRouter } from "react-router-dom";
import sortBy from "sort-by";

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            body: "",
            category: "",
            author: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        let postData = this.state;
        this.props.createPost(postData);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
          });
    }

  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  }
  render() {
    let posts = this.props.posts;
    let categories = this.props.categories;
    return (
      <div className="App">

        <Route exact path="/" render={(history) => (
            <div>
              <div>
                Categories:
                {this.props.categories.map(category => (
                  <div key={category.path} className="categories">
                        <Link key={category.name} to={`/${category.path}`}>
                        {category.name}
                        </Link>
                  </div>
                ))}
              </div>
              <div className="posts">
                <ul>
                  Posts:
                  {posts.map(post => (
                    <li key={post.id}>
                      <h2>{post.title}</h2>
                      <h4>{post.body}</h4>
                      <p>Category: {post.category}</p>
                      <p>Votes: {post.voteScore}</p>
                      <p>Time: {new Date(post.timestamp).toGMTString()}</p>
                        <Link className="addPost" to="/posts" >Add post</Link>
                        <Link className="editPost" to={`/posts/:${post.id}`}>Edit post</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}/>
        {categories.map(category => (
            <Route key={category.name}
                path={`/${category.path}`}
                render={(history) => (
                <div>
                    {posts.filter(post => post.category === category.name).map(post => (
                        <div key={post.id}>
                            <h2>{post.title}</h2>
                            <h4>{post.body}</h4>
                            <p>Category: {post.category}</p>
                            <p>Votes: {post.voteScore}</p>
                            <p>Time: {new Date(post.timestamp).toGMTString()}</p>
                        </div>
                        ))}
                </div>
            )}
          />
        ))}
        <Route path="/posts" render={() => (
            <form className="createPost" onSubmit={event => event.preventDefault()} >Add post
                <input type="text" placeholder="Title" name="title" onChange={this.handleInputChange} />
                <textarea placeholder="Body" name="body" onChange={this.handleInputChange}/>
                <input type="text" placeholder="Author" name="author" onChange={this.handleInputChange}/>
                <input type="text" placeholder="Category: react, redux or udacity" name="category" onChange={this.handleInputChange}/>
                <input type="submit" value="Submit" onClick={this.handleSubmit} />
            </form>
        )}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const props = Object.assign({}, state, {
    posts: state.posts.posts,
    categories: state.categories.categories
  });
  return props;
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => {
      dispatch(getPostsAsync());
    },
    getCategories: () => {
      dispatch(getCategoriesAsync());
    }, 
    createPost: (values) => {
        dispatch(createPostAsync(values));
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
