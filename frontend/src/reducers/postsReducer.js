import { GET_POSTS } from '../actions/getPosts';
import { ORDER_POSTS } from '../actions/orderPosts';
import { UP_VOTE_POST } from '../actions/upVotePost';
import { DOWN_VOTE_POST } from '../actions/downVotePost';
import { GET_POST_COMMENTS } from '../actions/getPostComments';
import { EDIT_POST } from '../actions/editPost';
import { DELETE_POST } from '../actions/deletePost';
import { CREATE_COMMENT } from '../actions/createComment';
import { EDIT_COMMENT } from '../actions/editComment';
import { CREATE_POST } from '../actions/createPost';
import { DELETE_COMMENT } from '../actions/deleteComment';

let initialState = {
    posts: [],
    comments: []
}

function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS: {
      return Object.assign({}, state, { posts: action.posts });
    }
    case ORDER_POSTS: {
        let orderedPosts =  action.orderedPosts.map(post => post);
        return Object.assign({}, state, { posts: orderedPosts});
    }
    case UP_VOTE_POST: {
        let posts = state.posts.map(post => post.id === action.post.id ? action.post : post)
        return Object.assign({}, state, { posts });
    }
    case DOWN_VOTE_POST: {
        let posts = state.posts.map(post => post.id === action.post.id ? action.post : post)
        return Object.assign({}, state, { posts });
    }
    case GET_POST_COMMENTS: {
        return Object.assign({}, state, {comments: action.comments})
    }
    case CREATE_POST: {
        let posts = state.posts.map(post => post);
        posts.push(action.post)
        return Object.assign({}, state, { posts })  
    }
    case CREATE_COMMENT: {
        let comments = state.comments.map(comment => comment);
        comments.push(action.comment);
        return Object.assign({}, state, { comments })  
    }
    case EDIT_POST: {
        let posts = state.posts.map(post => {
            if(post.id === action.post.id) 
                post = action.post
            return post;})
        return Object.assign({}, state, { posts });
    }
    case EDIT_COMMENT: {
        let comments = state.comments.map(comment => {
            if(comment.id === action.comment.id) 
                comment = action.comment
            return comment;})
        return Object.assign({}, state, { comments });
    }
    case DELETE_POST: {
        let posts = state.posts.
                    map(post => post.id === action.post.id ? post = action.post : post).
                    filter(post => post.deleted === false);
        return Object.assign({}, state, { posts });
    }
    case DELETE_COMMENT: {
        let comments = state.comments.map(comment => 
            comment.id === action.comment.id ? comment = action.comment : comment).
            filter(comment => comment.deleted === false)
        return Object.assign({}, state, { comments });  
    }
    default:
      return state;
  }
}

export default posts;
