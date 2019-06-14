import { API_URL } from "../../constants";

const SET_DIARY = "SET_DIARY";
const SET_DIARYLIST = "SET_DIARYLIST";
const SET_DIARYCONTENT = "SET_DIARYCONTENT";

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

//일기장 목록 가져오기
function getDiary() {
  return (dispatch, getState) => {
    const { user: {
      token
    } } = getState();

    console.log("getDiary() token:" + token);
    fetch(`${API_URL}/diary/getDiary`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        email: "qwerty@naver.com",
      }),
    })
      .then((response) => response.json())
      .then(data => {
        dispatch(setDiary(data));
      })
      .catch(e => e)
  };
}

//일기 리스트 가져오기
function getDiaryList(diary_num) {
  console.log("getDiaryList ()  diary_num : " + diary_num)
  return (dispatch, getState) => {
    const { user: {
      token
    } } = getState();
    console.log("getDiaryList() token:" + token);
    fetch(`${API_URL}/diaryList/getDiaryList`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        diary_num: diary_num
      }),
    }).then((response) => response.json())
      .then(diaryList => {
        console.log("diaryList : " + JSON.stringify(diaryList));
        dispatch(setDiaryList(diaryList));
      })
      .catch(e => e)
  };
}

//일기 내용 가져오기
function getDiaryContent(_diary_num, _page_num) {
  return (dispatch, getState) => {
    const { user: {
      token
    } } = getState();

    console.log("getDiaryContent() token:" + token);
    fetch(`${API_URL}/diaryList/getDiaryListContents`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        diary_num: _diary_num,
        page_num: _page_num
      })
    }).then((response => response.json()))
      .then(contents => {
        if (contents) {
          dispatch(setDiaryContent(contents));
        }
      })
  };
}

// 일기 내용 작성하기
function insertDiaryContents(_diary_num, _user_num, _title, _contents, _nickname, _email) {
  return (dispatch, getState) => {
    const { user: {
      token
    } } = getState();

    const insertResult = fetch(`${API_URL}/diaryList/insertDiaryContents`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        diary_num: _diary_num,
        user_num: _user_num,
        title: _title,
        contents: JSON.stringify(_contents),
        nickname: _nickname,
        email: _email,
      }),
    }).then((response) => response.json())
      .then(result => {
        if (JSON.stringify(result) > 0) {
          alert('일기 작성 완료');
          return true;
        } else {
          alert('일기 작성 실패');
          return false;
        }
      })
      .catch(e => e)
    return insertResult;
  }
}

// 일기 내용 삭제 
function deleteDiaryContents(_diary_num, _page_num) {
  console.log("deleteDiaryContents() _diary_num :" + _diary_num + "_page_num :" + _page_num);
  return (dispatch, getState) => {
    const { user: {
      token
    } } = getState();

    const deleteResult = fetch(`${API_URL}/diaryList/deleteDiaryContents`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        diary_num: _diary_num,
        page_num: _page_num
      }),
    }).then((response) => response.json())
        .then(result => {
          if (JSON.stringify(result) > 0) {
            alert('일기 삭제 완료');
            dispatch(getDiaryList(_diary_num));
            return true;
          } else {
            alert('일기 삭제 실패');
            return false;
          }
        })
        .catch(e => e)
    return deleteResult;
  }
}

// 일기 내용 수정
function updateDiaryContents(_diary_num, _page_num, _title) {
  console.log("updateDiaryContents()");
  return (dispatch, getState) => {
    const { user: { token }, diary: { diaryContent } } = getState();
    const updateResult = fetch(`${API_URL}/diaryList/updateDiaryContents`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        diary_num: _diary_num,
        page_num: _page_num,
        title: _title,
        contents: diaryContent
      }).then((response) => response.json())
        .then(result => {
          if (JSON.stringify(result) > 0) {
            alert('일기 수정 완료');
            return true;
          } else {
            alert('일기 수정 실패');
            return false;
          }
        })
        .catch(e => e)
    })

    return updateResult;

  }
}

const initialState = {
  myDiary: [],
  exDiary: [],
  totalDiary: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DIARY:
      return applySetDiary(state, action);
    case SET_DIARYLIST:
      return applySetDiaryList(state, action);
    case SET_DIARYCONTENT:
      return applySetDiaryContent(state, action);
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
        ex.push(diary)
      }
      else {
        my.push(diary)
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
  console.log('applySetDiaryList ()');
  const { diaryList } = action;
  return {
    ...state,
    diaryList
  };
}

function applySetDiaryContent(state, action) {
  console.log('applySetDiaryContent ()');
  const { diaryContent } = action;
  return {
    ...state,
    diaryContent
  };
}


const actionCreators = {
  getDiary,
  getDiaryList,
  getDiaryContent,
  insertDiaryContents,
  deleteDiaryContents,
  updateDiaryContents
};

export { actionCreators };

export default reducer;
