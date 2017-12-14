import { GET_POSTS } from '../actions/getPosts';
import { ORDER_POSTS } from '../actions/orderPosts';
import { UP_VOTE_POST } from '../actions/upVotePost';
import { DOWN_VOTE_POST } from '../actions/downVotePost';
import { GET_POST_COMMENTS } from '../actions/getPostComments';

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
        let posts = state.posts.map(post => post).map(post => post.id === action.post.id ? action.post : post)
        return Object.assign({}, state, { posts });
    }
    case DOWN_VOTE_POST: {
        let posts = state.posts.map(post => post).map(post => post.id === action.post.id ? action.post : post)
        return Object.assign({}, state, { posts });
    }
    case GET_POST_COMMENTS: {
        return Object.assign({}, state, {comments: action.comments})
    }
    default:
      return state;
  }
}

export default posts;
