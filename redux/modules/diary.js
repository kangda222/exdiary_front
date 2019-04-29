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

//일기장 가져오기
function getDiary() {
  return (dispatch, getSate) => {
    // const myDiary = [];
    // const exDiary = [];
    const myDiary = [{ title: "myDiary", id: "0" }];
    const exDiary = [
      { title: "exchangeDiary", id: "1" },
      { title: "exDiary2", id: "2" },
      { title: "exDiary3", id: "3" }
    ];
    dispatch(setDiary(myDiary, exDiary));
  };
}

//일기장 리스트 가져오기
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

const initialState = {};

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
