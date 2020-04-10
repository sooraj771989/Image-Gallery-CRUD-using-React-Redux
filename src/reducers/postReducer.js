import { RECEIVE_POST } from '../actions/types';

export default function postReducer(state = {}, action) {  
  switch (action.type) {
    case RECEIVE_POST:                                     
      return action.post;
    default:
      return state;
  }
};