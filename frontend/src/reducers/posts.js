import { GET_POSTS } from '../actions/getPosts';

let initialState = {
    posts: []
}

function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS: {
      return Object.assign({}, state, { posts: action.posts });
    }
    default:
      return state;
  }
}

export default posts;
