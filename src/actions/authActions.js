import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
const jwt = require('jsonwebtoken')
const SECRET_KEY = '123456789'
const expiresIn = '1h'
const apiUrl ="http://localhost:3001/users";
function createToken(payload){
  return jwt.sign(payload, SECRET_KEY, {expiresIn})
}
// Register User
export const registerUser = (userData, history) => dispatch => {
  // Get current users data
  var data = JSON.parse(data.toString());
  // Get the id of last user
  var last_item_id = data.users[data.users.length-1].id;
  const newUser = {
    id: last_item_id,
    name: userData.name,
    email: userData.email,
    password: userData.password,
  };
  axios
    .post(`${apiUrl}`, newUser)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Login - get user token
export const loginUser = userData => dispatch => {
  axios.post(`${apiUrl}?email=${userData.email}&password=${userData.password}`, userData)
    .then(res => {
      console.log("login endpoint called; request body:");
      console.log(res);
      const email = userData.email;
      const password = userData.password;
      const access_token = createToken({email, password})
      const token  = access_token;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(userData.email));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};