import { GET_POSTS } from '../actions/getPosts';
import { ORDER_POSTS } from '../actions/orderPosts';
import sortBy from "sort-by"; //sort-by changes array in place

let initialState = {
    posts: []
}

function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS: {
      return Object.assign({}, state, { posts: action.posts });
    }
    case ORDER_POSTS: {
        let orderedPosts = state.posts.map(post => post);
        console.log('this is happening in the reducer');
        orderedPosts.sort(sortBy(action.orderPostsBy));
        return Object.assign({}, state, { posts: orderedPosts });
    }
    default:
      return state;
  }
}

export default posts;
