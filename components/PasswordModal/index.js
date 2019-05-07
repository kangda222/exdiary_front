import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
  const {
    user: { isCorrect }
  } = state;
  return {
    isCorrect
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    checkPassword: password => {
      return dispatch(userActions.checkingPassword(password));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);
