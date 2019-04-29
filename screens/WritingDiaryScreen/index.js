import {connect} from 'react-redux'; // 컴포넌트를 스토어에 연결하는 것을 도와줌 
import Action from './action';


// 스토어에서 state를 복사해서 컨테이너의 props에 붙여넣기 
// dispatch는 액션을 리듀서로 보내는 function 
const mapStateToProps = state => {
    return {
        
    }
} 

export default connect(
    null,
    mapStateToProps
)(Action);