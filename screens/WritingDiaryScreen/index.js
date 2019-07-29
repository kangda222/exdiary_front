import { connect } from 'react-redux'; // 컴포넌트를 스토어에 연결하는 것을 도와줌 
import Action from './action';
import { actionCreators as diaryActions } from "../../redux/modules/diary";



// dispatch는 액션을 리듀서로 보내는 function 
const mapDispatchToProps = (dispatch) => {
    return {
        // 일기 내용 작성
        insertDiaryContents: (_diary_num, _title, _contents) => {
            return dispatch(diaryActions.insertDiaryContents(_diary_num, _title, _contents));
        },
        // 일기 내용 가져오기 
        getDiaryContent: (diary_num, page_num) => {
            return dispatch(diaryActions.getDiaryContent(diary_num, page_num));
        },
        // 일기 내용 수정하기
        updateDiaryContents: (diary_num, page_num, title, contents) => {
            return dispatch(diaryActions.updateDiaryContents(diary_num, page_num, title, contents));
        }
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Action);
