import { API_URL } from "../../constants";
import { actionCreators as userActions } from "./user";

const SET_DIARY = "SET_DIARY";
const SET_DIARYLIST = "SET_DIARYLIST";
const SET_DIARYCONTENT = "SET_DIARYCONTENT";
const SET_DIARYLISTCAl = "SET_DIARYLISTCAL";

function setDiary(data) {
  return {
    type: SET_DIARY,
    data
  };
}

function setDiaryList(diaryList) {
  return {
    type: SET_DIARYLIST,
    diaryList
  };
}

function setDiaryContent(diaryContent) {
  return {
    type: SET_DIARYCONTENT,
    diaryContent
  };
}

function setDiaryListCal(diaryList) {
  return {
    type: SET_DIARYLISTCAl,
    diaryListCal: diaryList
  };
}

//일기장 목록 가져오기
function getDiary() {
  console.log("getDiary()");
  return (dispatch, getState) => {
    const {
      user: {
        profile:{user_num},
        token
      }
    } = getState();

    console.log("user_num : " + user_num);

    fetch(`${API_URL}/diary/getDiary`, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        user_num: user_num
      })
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setDiary(data));
      })
      .catch(e => e);
  };
}

// 일기장 타이틀, 설명 변경 시
function updateDiaryInfo(_diary_num, _diary_title, _explanation) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    fetch(`${API_URL}/diary/updateDiaryInfo`, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        diary_num: _diary_num,
        diary_title: _diary_title,
        explanation: _explanation
      })
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setDiary(data));
      })
      .catch(e => e);
  };
}

// 일기장 삭제 시
function deleteDiary(_diary_num) {
  console.log("deleteDiary() : " + _diary_num);
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    fetch(`${API_URL}/diary/deleteDiary`, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        diary_num: _diary_num
      })
    })
      .then(response => response.json())
      .then(result => {
        if (JSON.stringify(result)) {
          alert("일기장 삭제 완료");
          dispatch(getDiary());
        }
      })
      .catch(e => e);
  };
}

//일기 리스트 가져오기
function getDiaryList(diary_num) {
  console.log("getDiaryList ()  diary_num : " + diary_num);
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    const result = fetch(`${API_URL}/diaryList/getDiaryList`, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        diary_num: diary_num
      })
    })
      .then(response => response.json())
      .then(diaryList => {
        if (diaryList) {
          dispatch(setDiaryList(diaryList));
          return true;
        }
      })
      .catch(e => e);
    return result;
  };
}

//일기 내용 가져오기
function getDiaryContent(_diary_num, _page_num) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    const result = fetch(`${API_URL}/diaryList/getDiaryListContents`, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        diary_num: _diary_num,
        page_num: _page_num
      })
    })
      .then(response => response.json())
      .then(async (contents) => {
        if (contents) {
          await dispatch(setDiaryContent(contents));
          return true;
        }
      })
      .catch(e => e);
    return result;
  };
}

// 일기 내용 작성하기
function insertDiaryContents(_diary_num, _title, _contents) {
  return (dispatch, getState) => {
    const {
      user: {
        profile: { user_num, nickname },
        token
      }
    } = getState();

    const insertResult = fetch(`${API_URL}/diaryList/insertDiaryContents`, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        diary_num: _diary_num,
        user_num: user_num,
        title: _title,
        contents: JSON.stringify(_contents),
        nickname: nickname
      })
    })
      .then(response => response.json())
      .then(async (result) => {
        if (JSON.stringify(result) > 0) {
          await dispatch(getDiaryContent(_diary_num, JSON.stringify(result)))
          return result;
        } else {
          alert("일기 작성 실패");
          return false;
        }
      })
      .catch(e => e);
    return insertResult;
  };

}

// 일기 내용 삭제
function deleteDiaryContents(_diary_num, _page_num) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    const deleteResult = fetch(`${API_URL}/diaryList/deleteDiaryContents`, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        diary_num: _diary_num,
        page_num: _page_num
      })
    })
      .then(response => response.json())
      .then(result => {
        if (JSON.stringify(result) > 0) {
          alert("일기 삭제 완료");
          dispatch(getDiaryList(_diary_num));
          return true;
        } else {
          alert("일기 삭제 실패");
          return false;
        }
      })
      .catch(e => e);
    return deleteResult;
  };
}

// 일기 내용 수정
function updateDiaryContents(_diary_num, _page_num, _title, _contents) {
  console.log("updateDiaryContents()");
  
  console.log("_diary_num : "+ _diary_num + "_page_num :" + _page_num + "_title :" + _title);

  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();

    const updateResult = fetch(`${API_URL}/diaryList/updateDiaryContents`, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        diary_num: _diary_num,
        page_num: _page_num,
        title: _title,
        contents: JSON.stringify(_contents)
      })
    })
      .then(response => response.json())
      .then(async (result) => {
        if (JSON.stringify(result) > 0) {
          alert("일기 수정 완료");
          await dispatch(getDiaryContent(_diary_num, _page_num));
          return true;
        } else {
          alert("일기 수정 실패");
          return false;
        }
      })
      .catch(e => e);
    return updateResult;
  };
}

//diaryList for Calender
function getDiaryListForCal() {
  console.log("getDiaryListForCal () : ");
  return (dispatch, getState) => {
    const {
      user: {
        profile: { email },
        token
      }
    } = getState();
    const result = fetch(`${API_URL}/diaryList/getDiaryListForCal`, {
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        email
      })
    })
      .then(response => {
        if (response.status === 403) {
          dispatch(userActions.logOut());
        } else {
          return response.json();
        }
      })
      .then(diaryList => {
        if (diaryList) {
          dispatch(setDiaryListCal(diaryList));
          return true;
        }
      })
      .catch(e => e);
    return result;
  };
}

const initialState = {
  myDiary: [],
  exDiary: [],
  totalDiary: [],
  diaryListCal: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DIARY:
      return applySetDiary(state, action);
    case SET_DIARYLIST:
      return applySetDiaryList(state, action);
    case SET_DIARYCONTENT:
      return applySetDiaryContent(state, action);
    case SET_DIARYLISTCAl:
      return applySetDiaryListForCal(state, action);
    default:
      return state;
  }
}

// 일기장 목록 가져오기
function applySetDiary(state, action) {
  const { data } = action;

  // 내일기, 교환일기 구분
  let ex = [];
  let my = [];

  if (data) {
    for (diary of data) {
      if (diary.diary_type === "exchange") {
        ex.push(diary);
      } else {
        my.push(diary);
      }
    }
  }

  return {
    ...state,
    exDiary: ex,
    myDiary: my,
    totalDiary: data
  };
}

function applySetDiaryList(state, action) {
  console.log("applySetDiaryList ()");
  const { diaryList } = action;
  return {
    ...state,
    diaryList
  };
}

function applySetDiaryContent(state, action) {
  console.log("applySetDiaryContent ()");
  const { diaryContent } = action;
  return {
    ...state,
    diaryContent
  };
}

function applySetDiaryListForCal(state, action) {
  const { diaryListCal } = action;
  return {
    ...state,
    diaryListCal
  };
}

const actionCreators = {
  getDiary,
  getDiaryList,
  getDiaryContent,
  updateDiaryInfo,
  deleteDiary,
  insertDiaryContents,
  deleteDiaryContents,
  updateDiaryContents,
  getDiaryListForCal
};

export { actionCreators };

export default reducer;
