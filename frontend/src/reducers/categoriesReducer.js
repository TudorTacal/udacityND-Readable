import { GET_CATEGORIES } from '../actions/getCategories';

let initialState = {
    categories: []
}

function categories(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES: {
      return Object.assign({}, state, { categories: action.categories });
    }
    default:
      return state;
  }
}

export default categories;
