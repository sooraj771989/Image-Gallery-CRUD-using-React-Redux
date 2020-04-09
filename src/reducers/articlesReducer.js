import { RECEIVE_ARTICLES, ADD_ARTICLE, REMOVE_ARTICLE } from '../actions/index';

const initialState = { articles: [] }

export default function articlesReducer(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_ARTICLES:
      return action.articles;
    case ADD_ARTICLE:
      return [action.payload, ...state];
    case REMOVE_ARTICLE:
      return state.filter(article => article.id !== action.payload.id);
    default:
      return state;
  }
}