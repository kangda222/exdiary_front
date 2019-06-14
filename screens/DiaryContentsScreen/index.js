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
        deleteDiaryContents: (_diary_num, _page_num) => {
            return dispatch(diaryActions.deleteDiaryContents(_diary_num, _page_num));
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
