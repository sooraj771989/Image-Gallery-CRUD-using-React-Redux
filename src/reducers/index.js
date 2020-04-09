import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import articles from "./articlesReducer";
import article from "./articleReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  articles: articles,
  article: article,
});