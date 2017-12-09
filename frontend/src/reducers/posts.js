import { GET_POSTS } from '../actions/getPosts';
import { ORDER_POSTS } from '../actions/orderPosts';

let initialState = {
    posts: []
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
    default:
      return state;
  }
}

export default posts;
