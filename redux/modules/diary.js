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
function getDiary(email) {

  return (dispatch, getState) => {
    let url = 'http://192.168.245.1:8080/diary/getDiary';
    fetch(url, {
      method: 'post',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        email: "qwerty@naver.com",
      }),
    })
      .then((response) => response.json())
      .then(data => {
        console.log("***** data.length : ", data.length)
        dispatch(setDiary(data));
      })
      .catch(e => e)
  };
}

//일기 리스트 가져오기
function getDiaryList(diary_num) {
  console.log('getDiaryList() diary_num : ', diary_num);
  return (dispatch, getState) => {
    let url = 'http://192.168.245.1:8080/diaryList/getDiaryList';
    fetch(url, {
      method: 'post',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        diary_num: diary_num
      }),

    }).then((response) => response.json())
      .then(diaryList => {
        console.log("***** diaryList.length : ", diaryList.length)
        dispatch(setDiaryList(diaryList));
      })
      .catch(e => e)
  };
}

//일기 내용 가져오기
function getDiaryContent(id) {
  return (dispatch, getSate) => {
    const diaryContent = [
      { title: "diarylist", id: "1", content: "lalalalala" },
      { title: "diarylist2", id: "2", content: "lalalal222222222222ala" }
    ];
    dispatch(setDiaryContent(diaryContent));
  };
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

  console.log('***** exDiary.length:' + ex.length);

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
  getDiaryContent
};

export { actionCreators };

export default reducer;
