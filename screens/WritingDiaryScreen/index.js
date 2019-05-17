import { connect } from 'react-redux'; // 컴포넌트를 스토어에 연결하는 것을 도와줌 
import Action from './action';
import { actionCreators as diaryActions } from "../../redux/modules/diary";

const mapStateToProps = (state, ownProps) => {
    const {
      user: { token }
    } = state;
    
    return {
        token
    };
  };

// dispatch는 액션을 리듀서로 보내는 function 
const mapDispatchToProps = (dispatch) => {
    return {
        insertDiaryContents: (_diary_num, _user_num, _title, _contents, _nickname, _email, token) => {
            return dispatch(diaryActions.insertDiaryContents(_diary_num, _user_num, _title, _contents, _nickname, _email, token));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Action);
