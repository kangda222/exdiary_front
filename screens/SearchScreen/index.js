import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state, ownProps) => {
  const { diary: { exDiary },
    user: { token, userList } } = state;
  return {
    token, userList, exDiary
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // 일기 교환 목록 가져오기 위해 
    getDiary: () => {
      dispatch(diaryActions.getDiary());
    },
    // 유저 검색 시 
    selectUser: (value) => {
      dispatch(userActions.selectUser(value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);
