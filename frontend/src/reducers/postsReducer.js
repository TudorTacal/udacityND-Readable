import { GET_POSTS } from '../actions/getPosts';
import { ORDER_POSTS } from '../actions/orderPosts';
import { UP_VOTE_POST } from '../actions/upVotePost';


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
    case UP_VOTE_POST: {
        let posts = state.posts.map(post => post).map(post => post.id === action.post.id ? action.post : post)
        return Object.assign({}, state, { posts });
    }
    default:
      return state;
  }
}

export default posts;
