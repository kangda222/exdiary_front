import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as userActions } from "../../redux/modules/user";

const mapStateToProps = (state, ownProps) => {
    const { user: { token, userList } } = state;
    return {
      token, userList
    };
  };
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
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
  