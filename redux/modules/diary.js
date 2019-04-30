const SET_DIARY = "SET_DIARY";
const FOCUSED_TITLE = "FOCUSED_TITLE";
const UNFOCUSED = "UNFOCUSED";

function setDiary(myDiary, exDiary) {
  return {
    type: SET_DIARY,
    myDiary,
    exDiary
  };
}

function getDiary() {
  return (dispatch, getSate) => {
    const myDiary = [];
    const exDiary = [];
    // const myDiary = [{ title: "myDiary", id: "0" }];
    // const exDiary = [
    //   { title: "exchangeDiary", id: "1" },
    //   { title: "exDiary2", id: "2" },
    //   { title: "exDiary3", id: "3" }
    // ];
    dispatch(setDiary(myDiary, exDiary));
  };
}

function focusTitle(){
  return{
    type:FOCUSED_TITLE
  };
}

function unFocusTitle(){
  return{
    type:UNFOCUSED,
  };
}

const initialState = {
  focused_title:false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DIARY:
      return applySetDiary(state, action);
    case FOCUSED_TITLE:
      return applyFocusTitle(state, action);
    case UNFOCUSED:
      return applyUnFocus(state,action);
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

function applyFocusTitle(state){
  return { 
    ...state,
    focused_title:true,
  }
}

function applyUnFocus(state){
  return { 
    ...state,
    focused_title:false,
  }
}

const actionCreators = {
  getDiary,
  focusTitle,
  unFocusTitle
};

export { actionCreators };

export default reducer;
