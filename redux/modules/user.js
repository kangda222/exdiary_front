// Imports
import { AsyncStorage } from "react-native";

// Actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";

// Action Creators
function setLogIn(token) {
  return {
    type: LOG_IN,
    token
  };
}

function logOut(user) {
  return { type: LOG_OUT };
}

// API Actions
function login(username, password) {
  console.log(`login username : ${username} password : ${password}`);
  return dispatch => {
    dispatch(setLogIn(""));
    return true;
  };
}

// Initial State
const initialState = {
  isLoggedIn: false
};

// Reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN:
      return applyLogIn(state, action);
    case LOG_OUT:
      return applyLogOut(state, action);
    default:
      return state;
  }
}

// Reducer Functions
function applyLogIn(state, action) {
  const { token } = action;
  return {
    ...state,
    isLoggedIn: true,
    token
  };
}

function applyLogOut(state, action) {
  console.log("===applyLogOut=============" + JSON.stringify(state));
  const { token } = action;
  AsyncStorage.clear();
  return {
    ...state,
    isLoggedIn: false,
    token: ""
  };
}

// Exports
const actionCreators = {
  login,
  logOut
};

export { actionCreators };

// Default Reducer Export
export default reducer;
