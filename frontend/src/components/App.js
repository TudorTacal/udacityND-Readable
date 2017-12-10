import React, { Component } from "react";
import { connect } from "react-redux";
import * as api from "../utils/readableApi";
import getPostsAsync from "../actions/getPosts";
import getCategoriesAsync from "../actions/getCategories";
import createPostAsync from "../actions/createPost";
import orderPostsAsync from "../actions/orderPosts";
import upVotePostAsync from "../actions/upVotePost";
import downVotePostAsync from "../actions/downVotePost";
import { fetchPosts } from "../utils/readableApi";
import { Route, Router, Link, history, withRouter } from "react-router-dom";
import CategoriesList from "./CategoriesList";
import PostsList from "./PostsList";
import PostsOrderChanger from "./PostsOrderChanger";
import PostForm from "./PostForm";

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            body: "",
            category: "",
            author: "",
            postOrderBy: ""
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
                <CategoriesList categories={categories}/>
                <PostsList posts={posts} onClickUpVote={this.props.upVotePost} onClickDownVote={this.props.downVotePost} />
                <PostsOrderChanger onChangeHandler={this.props.orderPosts}/>
            </div>
          )}/>
        {categories.map(category => (
            <Route key={category.name}
                path={`/${category.path}`}
                render={(history) => (
                <div>
                    <PostsList posts={posts.filter(post => post.category === category.name)}/>
                    <PostsOrderChanger onChangeHandler={this.props.orderPosts}/>
                </div>
            )}
          />
        ))}
        <Route path="/posts" render={() => (
            <PostForm type="Create" onInputChange={this.handleInputChange} onSubmitClick={this.handleSubmit}/>
        )}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const props = Object.assign({}, state, {
    orderPostsBy: state.orderPostsBy,
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
    },
    orderPosts: (orderPostsBy) => {
        dispatch(orderPostsAsync(orderPostsBy));
    },
    upVotePost: (id) => {
        dispatch(upVotePostAsync(id));
    },
    downVotePost: (id) => {
        dispatch(downVotePostAsync(id));
    },
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
