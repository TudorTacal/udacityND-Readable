import React, { Component } from "react";
import { connect } from "react-redux";
import * as api from "../utils/readableApi";
import getPostsAsync from "../actions/getPosts";
import getCategoriesAsync from "../actions/getCategories";
import createPostAsync from "../actions/createPost";
import orderPostsAsync from "../actions/orderPosts";
import editPostAsync from "../actions/editPost";
import editCommentAsync from "../actions/editComment";
import { fetchPosts } from "../utils/readableApi";
import { Route, Router, Link, withRouter, Switch } from "react-router-dom";
import CategoriesList from "./CategoriesList";
import PostsList from "./PostsList";
import PostsOrderChanger from "./PostsOrderChanger";
import PostForm from "./PostForm";
import Post from "./Post";
import EditPostForm from "./EditPostForm";
import Modal from "react-modal";
import AddComment from './AddComment';
import FaPencil from "react-icons/lib/fa/pencil";
import FaPlus from "react-icons/lib/fa/plus";
import Fragment from 'react-addons-create-fragment'; 
import FaClose from "react-icons/lib/fa/close";
import NotFoundPage from "./NotFoundPage";
import PostPage from "./PostPage";
import EditCommentForm from "./EditCommentForm";

Modal.setAppElement("body");

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
        this.createPostHandler = this.createPostHandler.bind(this);
        this.editPostHandler = this.editPostHandler.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.editCommentHandler = this.editCommentHandler.bind(this);
    }

    createPostHandler() {
        let postData = this.state;
        this.props.createPostAsync(postData);
        this.clearForm(postData);
        
    }

    clearForm(data){
        for(let property in data) {
            if(data.hasOwnProperty(property))
                this.setState({[property]: ""});            
        }
    }

    editCommentHandler(comment) {
        let timestamp = Date.now();
        let body = this.state.body || comment.body;
        let commentData = { timestamp, body };
        this.props.editCommentAsync(comment.id, commentData); 
        this.clearForm(commentData);   
    }
    editPostHandler(post) {
        let title = this.state.title || post.title;
        let body = this.state.body || post.body;
        let postData = { title, body};
        this.props.editPostAsync(post.id, postData);
        this.clearForm(postData);
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
    this.props.getPostsAsync();
    this.props.getCategoriesAsync();
  }
  render() {
    let posts = this.props.posts;
    let categories = this.props.categories;
    let comments = this.props.comments;
    return (
        <div className="App container" >
            <Link className="title" to="/">Readable</Link>
            <Switch>
                <Route exact path="/" render={(props) => (
                    <div>
                        <CategoriesList categories={categories}/>
                        <Link className="addPost" to="/posts">
                            <button type="button" className="addPostButton btn btn-secondary btn-sm">
                                <span>Add post</span> 
                                <FaPlus size={12}/>
                            </button>
                        </Link> 
                        <PostsList {...props} posts={posts} />
                        <PostsOrderChanger onChangeHandler={this.props.orderPostsAsync}/>      
                    </div>
                )}/>
                 <Route exact path={`/posts/:id`}
                    render={(props) => (
                        <EditPostForm {...props} posts={posts} 
                            type="edit" 
                            onInputChange={this.handleInputChange}
                            onSubmitClick={this.editPostHandler}
                        />
                )}/>
                  <Route exact path="/posts" render={(props) => (
                    <PostForm type="create" 
                        onInputChange={this.handleInputChange} 
                        values={this.state}
                        onSubmitClick={this.createPostHandler}
                    />
                )}/>
                <Route exact path="/:category"
                    render={(props) => (
                    <div>
                        <CategoriesList categories={categories}/>
                        <Link className="addPost" to="/posts">
                            <button type="button" className="addPostButton btn btn-secondary btn-sm">
                                <span>Add post</span> 
                                <FaPlus size={12}/>
                            </button>
                        </Link> 
                        <PostsList {...props} posts={posts}/>
                        <PostsOrderChanger onChangeHandler={this.props.orderPosts}/>
                    </div>
                )}/>
                <Route exact path="/comments/:id" render={(props) => (
                    <EditCommentForm {...props} onInputChange={this.handleInputChange}
                         onSubmitClick={this.editCommentHandler} comments={comments}/>
                )}/>
                <Route exact path="/:category/:id"
                    render={(props) => (
                        <div className="postPage">
                            <PostPage {...props} posts={posts} />
                            <AddComment {...props} posts={posts} onInputChange={this.handleInputChange}/>
                        </div>
                )}/>
            </Switch>
    </div>
    );
  }
}

function mapStateToProps(state) {
  const props = Object.assign({}, state, {
    orderPostsBy: state.orderPostsBy,
    posts: state.posts.posts,
    categories: state.categories.categories,
    comments: state.posts.comments
  });
  return props;
}


export default withRouter(connect(mapStateToProps,
     { getPostsAsync, getCategoriesAsync, createPostAsync,
        orderPostsAsync, editPostAsync, editCommentAsync})(App));
