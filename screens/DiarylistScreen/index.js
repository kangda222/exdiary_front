import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state, ownProps) => {
  const {
    diary: { diaryContent },
  } = state;
  
  return {
    diaryContent
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDiaryContent:(diary_num,page_num) => {
      dispatch(diaryActions.getDiaryContent(diary_num,page_num));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);
