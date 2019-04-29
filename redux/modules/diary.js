const SET_DIARY = "SET_DIARY";

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

const initialState = {};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DIARY:
      return applySetDiary(state, action);
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

const actionCreators = {
  getDiary
};

export { actionCreators };

export default reducer;
