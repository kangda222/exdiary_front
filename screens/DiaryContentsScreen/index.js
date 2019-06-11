import { connect } from "react-redux";
import Action from "./action";
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state, ownProps) => {
    const { diary: { diaryContent },
    } = state;
    return {
        diaryContent
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteDiaryContents: () => {
            dispatch(diaryActions.deleteDiaryContents());
        },
        updateDiaryContents: () => {
            dispatch(diaryActions.updateDiaryContents());
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Action);
