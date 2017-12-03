import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import posts from './reducers/posts';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ || compose;


const store = createStore(posts, applyMiddleware(thunk));

export default store;