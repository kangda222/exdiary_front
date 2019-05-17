import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state, ownProps) => {
  const {
    diary: { diaryList },
    user : { token }} = state;
  return { diaryList,token };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  //const {id} = ownProps;
  return {
    getDiarylist: (diary_num,token) => {
      return dispatch(diaryActions.getDiaryList(diary_num,token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);
