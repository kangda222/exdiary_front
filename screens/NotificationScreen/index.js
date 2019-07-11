import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as userActions } from "../../redux/modules/user";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state, ownProps) => {
  const { user: { notificationList } } = state;
  return {
    notificationList // 알림 리스트
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // 알림 리스트 가져오기 
    _setNotification: () => {
      dispatch(userActions._setNotification());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);

