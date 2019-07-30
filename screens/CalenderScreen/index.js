import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = state => {
  // console.log(`calender state !!!!!!!!!!!!!!!!!!!`);
  // console.log(state);
  const {
    diary: { diaryListCal, myDiary, exDiary }
  } = state;
  const myDNum = myDiary.length;
  const exDNum = exDiary.length;
  //console.log(`calender state !!!!!!!diaryListCal!!!!!!!!!!!! :: `);
  //console.log(diaryListCal);
  return { diaryListCal, myDNum, exDNum };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDiaryListForCal: () => {
      return dispatch(diaryActions.getDiaryListForCal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);
