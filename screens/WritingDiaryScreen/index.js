import {connect} from 'react-redux'; // 컴포넌트를 스토어에 연결하는 것을 도와줌 
import Action from './action';
import { actionCreators as diaryActions } from "../../redux/modules/diary";

// 스토어에서 state를 복사해서 컨테이너의 props에 붙여넣기 
const mapStateToProps = (state) => {
    return{
        
    }
};


// dispatch는 액션을 리듀서로 보내는 function 
const mapDispatchToProps = (dispatch) => {
    return {
        insertDiaryContents: (_diary_num,_user_num,_title,_contents,_nickname,_email) => {
            dispatch(diaryActions.insertDiaryContents (_diary_num,_user_num,_title,_contents,_nickname,_email));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Action);
