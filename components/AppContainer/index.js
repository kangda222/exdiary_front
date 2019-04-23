import { connect } from "react-redux";
import AppContainer from "./screen";

const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  return {
    isLoggedIn: user.isLoggedIn
  };
};

export default connect(mapStateToProps)(AppContainer);
