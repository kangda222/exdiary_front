import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state, ownProps) => {
  const { diary: {exDiary, myDiary, totalDiary} } = state;
  return {
    exDiary,myDiary,totalDiary
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDiary: () => {
      dispatch(diaryActions.getDiary());
    },
    getDiaryList: () => {
      dispatch(diaryActions.getDiaryList());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);
