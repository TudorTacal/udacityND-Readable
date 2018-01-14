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
import { Route, Router, Link, withRouter} from "react-router-dom";
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
    }

    createPostHandler() {
        let postData = this.state;
        this.props.createPost(postData);
        this.clearForm(postData);
    }

    clearForm(data){
        for(let property in data) {
            if(data.hasOwnProperty(property))
                this.setState({[property]: ""}, function (){console.log(this.state)})            
        }
    }

    editCommentHandler(id) {
        let timestamp = Date.now();
        let body = this.state.body;
        let commentData = { timestamp, body };
        this.props.editComment(id, commentData);    
    }
    editPostHandler(post) {
        let title = this.state.title || post.title;
        let body = this.state.body || post.body;
        let postData = { title, body};
        this.props.editPost(post.id, postData);
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
                    <Link className="addPost" to="/posts">
                        <button type="button" className="addPostButton btn btn-secondary btn-sm">
                            <span>Add post</span> 
                            <FaPlus size={12}/>
                        </button>
                    </Link> 
                    <PostsList posts={posts} />
                    <PostsOrderChanger onChangeHandler={this.props.orderPosts}/>      
                </div>
        )}/>
        
        {categories.map(category => (
            <Route exact key={category.name}
                path={`/${category.path}`}
                render={(history) => (
                <div>
                    <CategoriesList categories={categories}/>
                    <Link className="addPost" to="/posts">
                        <button type="button" className="addPostButton btn btn-secondary btn-sm">
                            <span>Add post</span> 
                            <FaPlus size={12}/>
                        </button>
                    </Link> 
                    <PostsList posts={posts.filter(post => post.category === category.name)}/>
                    <PostsOrderChanger onChangeHandler={this.props.orderPosts}/>
                </div>
            )}
        />
        ))}
        <Route exact path="/posts" render={() => (
            <PostForm type="create" onInputChange={this.handleInputChange} values={this.state} onSubmitClick={this.createPostHandler}/>
        )}/>
        {posts.map(post => (
            <Fragment key={post.id}>
                <Route 
                    exact
                    path={`/${post.category}/${post.id}`}
                    render={() => (
                        <div className="postPage">
                            <Post  post={post} displayComments={true}/>
                            <AddComment post={post} onInputChange={this.handleInputChange}/>
                        </div>
                    )}/>
                <Route 
                    exact
                    path={`/posts/${post.id}`}
                    render={() => (
                        <EditPostForm type="edit" post={post} onInputChange={this.handleInputChange} onSubmitClick={() => this.editPostHandler(post)}/>
                    )}/>
            </Fragment>
        ))}
        {this.props.comments.map(comment => (
                <Route key={comment.id}
                exact
                path={`/comments/${comment.id}`}
                    render={() => (
                    <form className="editCommentForm" onSubmit={(event) => event.preventDefault() }>
                        <button style={{color: 'black', float: "right", background: "none", border: 0}} onClick={this.props.history.goBack}>
                            <FaClose style={{float: "right"}} size={12}/>
                        </button>
                        {console.log(comment)}
                        <div className="form-group">
                            <label htmlFor="editTitle">Edit comment</label><br/>
                            <textarea placeholder="Body" name="body" onChange={this.handleInputChange} defaultValue={comment.body}/>
                        </div>
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
