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
    updateProfile: (username, phoneNumber, isMale, image) => {
      return dispatch(
        userActions.updateProfile(username, phoneNumber, isMale, image)
      );
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Action);
