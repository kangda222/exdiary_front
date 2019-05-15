import { connect } from 'react-redux'; // 컴포넌트를 스토어에 연결하는 것을 도와줌 
import Action from './action';
import { actionCreators as diaryActions } from "../../redux/modules/diary";

// dispatch는 액션을 리듀서로 보내는 function 
const mapDispatchToProps = (dispatch) => {
    return {
        insertDiaryContents: (_diary_num, _user_num, _title, _contents, _nickname, _email) => {
            return dispatch(diaryActions.insertDiaryContents(_diary_num, _user_num, _title, _contents, _nickname, _email));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Action);
