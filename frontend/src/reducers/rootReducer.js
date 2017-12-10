import { combineReducers } from 'redux';
import { GET_CATEGORIES } from '../actions/getCategories';
import { GET_POSTS } from '../actions/getPosts';
import categories from './categories';
import posts from './postsReducer';

export default combineReducers({
    posts: posts,
    categories: categories
}) 