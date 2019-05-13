import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state, ownProps) => {
    const { diaryContents } = state;
    return {
        diaryContents
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        
    }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Action);
