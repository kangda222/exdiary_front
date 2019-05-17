import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state, ownProps) => {
  const {
    diary: { diaryContent },
    user: {token}
  } = state;
  
  return {
    diaryContent,token
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getDiaryContent:(diary_num,page_num,token) => {
      dispatch(diaryActions.getDiaryContent(diary_num,page_num,token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);
