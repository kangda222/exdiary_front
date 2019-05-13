import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state, ownProps) => {
  const {
    diary: { diaryList }
  } = state;
  return { diaryList };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  //const {id} = ownProps;
  return {
    getDiarylist: diary_num => {
      return dispatch(diaryActions.getDiaryList(diary_num));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);
