// Imports
import { AsyncStorage } from "react-native";
import { API_URL } from "../../constants";
import uuidv1 from "uuid/v1";

// Actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const SAVE_TOKEN = "SAVE_TOKEN";
const SEARCH_USER = "SEARCH_USER";
const SET_NOTIFICATION = "SET_NOTIFICATION";

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

function searchUser(search_user) {
  return {
    type: SEARCH_USER,
    search_user
  }
}

function setNotification(notification) {
  return {
    type: SET_NOTIFICATION,
    notification
  }
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
    //console.log(getState());
    const {
      user: {
        profile: { email },
        token
      }
    } = getState();
    console.log(`email: ${email} password : ${password}`);
    return fetch(`${API_URL}/user/checkPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(response => {
        if (response.status === 403) {
          dispatch(logOut());
        } else {
          return response.json();
        }
      })
      .then(json => {
        console.log(JSON.stringify(json));
        if (json.isCorrect) {
          return true;
        } else {
          return false;
        }
      });
  };
}

//비밀번호 변경
function updatePassword(password) {
  return (dispatch, getState) => {
    console.log(`update password :: ${password}`);
    const {
      user: {
        profile: { email },
        token
      }
    } = getState();
    console.log(`email: ${email} password : ${password}`);
    return fetch(`${API_URL}/user/updatePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(response => {
        if (response.status === 403) {
          dispatch(logOut());
        } else {
          return response.json();
        }

      })
      .then(json => {
        console.log(JSON.stringify(json));
        if (json.isUpdate) {
          return true;
        } else {
          return false;
        }
      });
  };
}

//회원탈퇴
function secession() {
  return (dispatch, getState) => {
    console.log(`==탈퇴==`);
  };
}

//프로필 수정
function updateProfile(nickname, phoneNumber, isMale, image) {
  return (dispatch, getState) => {
    const {
      user: {
        profile: { email },
        token
      }
    } = getState();
    console.log(
      `updateProfile nickname ${nickname}, phoneNumber ${phoneNumber}, isMale ${isMale}, image ${image}`
    );
    const gender = isMale ? "M" : "F";
    const data = new FormData();
    data.append("email", email);
    data.append("nickname", nickname);
    data.append("phoneNumber", phoneNumber);
    data.append("gender", gender);
    data.append("file", {
      uri: image,
      type: "image/jpeg",
      name: `${uuidv1()}.jpg`
    });
    //dispatch(setUser({ name: username }));
    return fetch(`${API_URL}/user/updateProfile`, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`
      },
      body: data
    })
      .then(response => {
        if (response.status === 403) {
          dispatch(logOut());
        } else {
          return response.json();
        }
      })
      .then(json => {
        console.log(JSON.stringify(json));
        if (json.isUpdate) {
          return true;
        } else {
          return false;
        }
      });
  };
}

// 유저 검색
function selectUser(_searchValue) {
  console.log("selectUser() :" + _searchValue);
  return (dispatch, getState) => {
    const { user: {
      token
    } } = getState();

    fetch(`${API_URL}/user/selectUser`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        email: '',
        nickname: _searchValue,
      }),
    })
      .then((response) => response.json())
      .then(userList => {
        if (userList.length > 0) {
          console.log("userList() :" + JSON.stringify(userList));
          dispatch(searchUser(userList));
        }
        else {
          alert('일치하는 유저가 존재하지 않습니다');
        }
      })
      .catch(e => e)
  }
}

// 교환 신청 쪽지 전송 
function sendExchangeRequest(ex_title, ex_diary_num, member, inviter) {
  console.log("sendExchangeRequest()");
  return (dispatch, getState) => {
    const { user: {
      profile: { email, user_num },
      token,
    } } = getState();
    const result = fetch(`${API_URL}/user/insertExchangeRequest`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        user_num: user_num,
        email: email,
        ex_title: ex_title,
        ex_diary_num: ex_diary_num,
        member: member,
        inviter: inviter
      }),
    })
      .then((response) => response.json())
      .then(response => {
        if (JSON.stringify(response) > 0) {
          alert("교환 신청이 완료되었습니다.");
          return true;
        }
        else {
          alert("교환 신청에 실패했습니다.");
          return false;
        }
      })
      .catch(e => e)
    return result;
  }
}

// 로그인한 유저 관련 알림 가져오기 
function _setNotification() {
  console.log("setNotification()");
  return (dispatch, getState) => {
    const { user: {
      profile: { user_num },
      token,
    } } = getState();

    console.log("user_num :"+user_num);

    fetch(`${API_URL}/user/getNotificationList`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        member:user_num
      })
    }).then((response) => response.json())
      .then(list => {
        console.log("List :" + JSON.stringify(list));
        dispatch(setNotification(list));
      })
      .catch(e => e)

  }
}

// Initial State
const initialState = {
  isLoggedIn: false,
  userList: [],
  notificationList:[]
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
    case SEARCH_USER:
      return applySearchUser(state, action);
    case SET_NOTIFICATION:
      return applySetNotification(state, action);
    default:
      return state;
  }
}

// Reducer Functions
function applyLogIn(state, action) {
  //console.log("===applyLogIn=============" + JSON.stringify(state));
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
  console.log(AsyncStorage.getAllKeys());
  await AsyncStorage.clear();
  return {
    ...state,
    isLoggedIn: false,
    token: ""
  };
}

function applySetUser(state, action) {
  //console.log("===applySetUser=============" + JSON.stringify(state));
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

function applySearchUser(state, action) {
  const { search_user } = action;
  return {
    ...state,
    userList: search_user
  }
}

function applySetNotification(state, action) {
  const { notification } = action;
  return {
    ...state,
    notificationList: notification
  }
}

// Exports
const actionCreators = {
  login,
  logOut,
  signUp,
  checkingPassword,
  updatePassword,
  secession,
  updateProfile,
  selectUser,
  sendExchangeRequest,
  _setNotification
};

export { actionCreators };

// Default Reducer Export
export default reducer;
