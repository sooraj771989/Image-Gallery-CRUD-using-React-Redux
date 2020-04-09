import { RECEIVE_ARTICLE } from '../actions/index';

export default function articleReducer(state = {}, action) {  
  switch (action.type) {
    case RECEIVE_ARTICLE:                                     
      return action.article;
    default:
      return state;
  }
};