
const CHANGE_NONE_LIST = 'CHANGE_NONE_LIST';
const CHANGE_EXIST_LIST = 'CHANGE_EXIST_LIST';

// 액션 함수 정의
export const CHANGE_NONE_LIST = view => ({
    type:CHANGE_NONE_LIST,view
});
export const CHANGE_EXIST_LIST = view => ({
    type:CHANGE_NONE_LIST,view
});

// 초기 상태 정의
const initialState = {
    view:''
};

export default function reducer(state = initialState, action){
    switch (action.type) {
        case CHANGE_NONE_LIST:
            return {
                ...state,
            };
        case CHANGE_EXIST_LIST: 
            return {
                ...state,
            };
        default:
        return state;
    }
}