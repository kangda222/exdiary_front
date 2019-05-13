import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state, ownProps) => {
  const {
    diary: { diaryContent }
  } = state;
  return {
    diaryContent
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDiaryContent:page_num => {
      dispatch(diaryActions.getDiaryContent(page_num));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);
