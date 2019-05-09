const SET_DIARY = "SET_DIARY";
const SET_DIARYLIST = "SET_DIARYLIST";
const SET_DIARYCONTENT = "SET_DIARYCONTENT";

function setDiary(myDiary, exDiary) {
  return {
    type: SET_DIARY,
    myDiary,
    exDiary
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
  return (dispatch, getSate) => {
    let url = 'http://192.168.245.1:8080/diary/getDiary';
    fetch(url,{
      method:'post',
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      body:JSON.stringify({
        email:"qwerty@naver.com",
      }),
    })
    .then((response) => response.json())
    .then(data => {
      const diaryList = JSON.stringify(data);
      if(diaryList){
        // dispatch(setDiary(diaryList));
      }
      
    })
    .catch(e => e)
  };
}

//일기 리스트 가져오기
function getDiaryList(id) {
  return (dispatch, getState) => {
    const diaryList = [
      { title: "diarylist", id: "1", content: "lalalalala" },
      { title: "diarylist2", id: "2", content: "lalalal222222222222ala" }
    ];
    dispatch(setDiaryList(diaryList));
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
  exDiary: []
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
  const { myDiary, exDiary } = action;
  return {
    ...state,
    myDiary,
    exDiary
  };
}
function applySetDiaryList(state, action) {
  const { diaryList } = action;
  return {
    ...state,
    diaryList
  };
}

function applySetDiaryContent(state, action) {
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
