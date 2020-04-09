import axios from 'axios';
import history from '../history';

export const RECEIVE_ARTICLES = 'GET_ARTICLES';
export const ADD_ARTICLE = 'ADD_ARTICLE';
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const REPLACE_ARTICLE = 'REPLACE_ARTICLE';

const apiUrl = 'http://localhost:3001/posts';

export const getArticles = () => {
  return (dispatch) => {
    return axios.get(`${apiUrl}`)
      .then(response => {
        dispatch({type: RECEIVE_ARTICLES, articles: response.data})
      })
      .catch(error => { throw(error); });
  };
};

export const addArticle = ({ title, content }) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}`, {title, content})
      .then(response => {
        let data = response.data;
        dispatch({type: ADD_ARTICLE, payload: {id: data.id, title: data.title, content: data.content}})
      })
      .then(() => {
        history.push("/editdashboard")
      })
      .catch(error => { throw(error) });
  };
};

export const getArticle = (id) => {
  return (dispatch) => {
    return axios.get(`${apiUrl}/${id}`)
      .then(response => {
        dispatch({type: RECEIVE_ARTICLE, article: response.data});
      })
      .catch(error => { 
        throw(error); 
      });
  };
};

export const deleteArticle = (id) => {
  return (dispatch) => {
    return axios.delete(`${apiUrl}/${id}`)
      .then(response => {
        dispatch({type: REMOVE_ARTICLE, payload: {id}})
      })
      .then(() => {
        history.push("/editdashboard")
      })
      .catch(error => {
        throw(error);
      });
  };
};

export const updateArticle = (article) => {
  const articleId = article.id;
  return (dispatch) => {
    return axios.patch(`${apiUrl}/${article.id}`, {title: article.title, content: article.content, author: article.author})
      .then(response => {
        const data = response.data;
        dispatch({type: UPDATE_ARTICLE, payload: {id: data.id, title: data.title, content: data.content, author: data.author}})
        dispatch({type: REPLACE_ARTICLE, payload: {id: data.id, title: data.title, content: data.content, author: data.author}})
      })
      .then(() => {
        history.push(`/post/${articleId}`)
      })
      .catch(error => { throw(error) });
  };
};