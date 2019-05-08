import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as userActions } from "../../redux/modules/user";

// const mapStateToProps = (state, ownProps) => {
//   const {
//     user: { isCorrect }
//   } = state;
//   return {
//     isCorrect
//   };
// };

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => {
      return dispatch(userActions.logOut());
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Action);
