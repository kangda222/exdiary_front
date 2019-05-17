// Imports
import { AsyncStorage } from "react-native";
import { API_URL } from "../../constants";

// Actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const SAVE_TOKEN = "SAVE_TOKEN";

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

function setUser(user) {
  return {
    type: SET_USER,
    user
  };
}

function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token
  };
}

// API Actions
function login(email, password) {
  console.log(`login email : ${email} password : ${password}`);
  return dispatch => {
    return fetch(`${API_URL}/user/logIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(response => response.json())
      .then(json => {
        console.log(JSON.stringify(json));
        if (json.user) {
          dispatch(setLogIn(json.user.token));
          dispatch(setUser(json.user));
          return true;
        } else {
          return false;
        }
      });
    // dispatch(setLogIn(""));
    // dispatch(setUser({ name: "user01" }));
    // return true;
  };
}

//회원가입
function signUp(username, password, email) {
  console.log(
    `login username : ${username} password : ${password} email : ${email}`
  );
  return dispatch => {
    return false;
  };
}

//비밀번호 일치여부
function checkingPassword(password) {
  return (dispatch, getState) => {
    const {
      user: { username }
    } = getState();
    console.log(`username: ${username} password : ${password}`);
    if (password === "1234") {
      return true;
    } else {
      return false;
    }
  };
}

//비밀번호 변경
function updatePassword(password) {
  return (dispatch, getState) => {
    console.log(`update password :: ${password}`);
    return true;
  };
}

//회원탈퇴
function secession() {
  return (dispatch, getState) => {
    console.log(`==탈퇴==`);
  };
}

//프로필 수정
function updateProfile(username, phoneNumber, isMale) {
  return (dispatch, getState) => {
    console.log(
      `updateProfile!!!!!!!!!! username ${username}, phoneNumber ${phoneNumber}, isMale ${isMale}`
    );
    dispatch(setUser({ name: username }));
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
    case SET_USER:
      return applySetUser(state, action);
    case SAVE_TOKEN:
      return applySetToken(state, action);
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

async function applyLogOut(state, action) {
  console.log("===applyLogOut=============" + JSON.stringify(state));
  const { token } = action;
  await AsyncStorage.clear();
  return {
    ...state,
    isLoggedIn: false,
    token: ""
  };
}

function applySetUser(state, action) {
  const { user } = action;
  return {
    ...state,
    profile: user
  };
}

function applySetToken(state, action) {
  const { token } = action;
  //localStorage.setItem("jwt", token);
  return {
    ...state,
    isLoggedIn: true,
    token: token
  };
}

// Exports
const actionCreators = {
  login,
  logOut,
  signUp,
  checkingPassword,
  updatePassword,
  secession,
  updateProfile
};

export { actionCreators };

// Default Reducer Export
export default reducer;
