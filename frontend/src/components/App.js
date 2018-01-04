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
import { Route, Router, Link, history, withRouter } from "react-router-dom";
import CategoriesList from "./CategoriesList";
import PostsList from "./PostsList";
import PostsOrderChanger from "./PostsOrderChanger";
import PostForm from "./PostForm";
import Post from "./Post";
import EditPostForm from "./EditPostForm";
import Modal from "react-modal";
import AddComment from './AddComment';
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
    }

    createPostHandler() {
        let postData = this.state;
        this.props.createPost(postData);
    }

    editCommentHandler(id) {
        let timestamp = Date.now();
        let body = this.state.body;
        let commentData = { timestamp, body };
        this.props.editComment(id, commentData);    
    }
    editPostHandler(id) {
        let title = this.state.title;
        let body = this.state.body;
        let postData = { title, body};
        this.props.editPost(id, postData);
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
            <div className="App container" >
                <Link className="title" to="/">Readable</Link>
                <Route exact path="/" render={(history) => (
                    <div>
                        <CategoriesList categories={categories}/>
                        <PostsList posts={posts} />
                        <PostsOrderChanger onChangeHandler={this.props.orderPosts}/>
                        <Link className="addPost" to="/posts">
                            Add post
                        </Link>       
                    </div>
                )}/>
                
                {categories.map(category => (
                    <Route exact key={category.name}
                        path={`/${category.path}`}
                        render={(history) => (
                        <div>
                            <CategoriesList categories={categories}/>
                            <PostsList posts={posts.filter(post => post.category === category.name)}/>
                            <PostsOrderChanger onChangeHandler={this.props.orderPosts}/>
                            <Link className="btn" to="/posts">
                                Add post
                            </Link>
                        </div>
                    )}
                />
                ))}
                <Route exact path="/posts" render={() => (
                    <PostForm type="Create" onInputChange={this.handleInputChange} onSubmitClick={this.createPostHandler}/>
                )}/>
                {posts.map(post => (
                    <div key={post.id}>
                        <Route 
                            exact
                            path={`/${post.category}/${post.id}`}
                            render={() => (
                                <div>
                                    <Post post={post} displayComments={true}/>
                                    <AddComment post={post} onInputChange={this.handleInputChange}/>
                                </div>
                            )}/>
                        <Route 
                            exact
                            path={`/posts/${post.id}`}
                            render={() => (
                                <EditPostForm type="Edit" post={post} onInputChange={this.handleInputChange} onSubmitClick={() => this.editPostHandler(post.id)}/>
                            )}/>
                    </div>
                ))}
                {this.props.comments.map(comment => (
                     <Route key={comment.id}
                        exact
                        path={`/comments/${comment.id}`}
                         render={() => (
                            <form onSubmit={(event) => event.preventDefault() }>
                                Edit comment
                               <textarea placeholder="Body" name="body" onChange={this.handleInputChange} defaultValue={comment.body}/>
                               <input type="submit" value="Submit" onClick={() => this.editCommentHandler(comment.id)} />
                           </form>
                     )}/>
                ))}

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
    editPost: (id, values) => {
        dispatch(editPostAsync(id, values));
    },
    editComment: (id, values) => {
        dispatch(editCommentAsync(id, values));
    }
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
