import React, { Component } from "react";
import UserSearchScreen from './screen';

class Action extends Component {

    state = {
        searchValue: '',
        userList: this.props.userList,
        isFetching: false,
    }

    render() {
        return (
            <UserSearchScreen
                {...this.props}
                {...this.state}
                userSearch={this._userSearch}
                changeSerarchValue={this._changeSerarchValue}
                searchUserInfo={this._searchUserInfo}
                exchangeRequest={this._exchangeRequest}
                cancel={this._cancel}
            />
        );
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.userList[0].nickname !== prevState.userList[0].nickname || 
            (nextProps.userList.length !== prevState.userList.length)
            ) {
            return {
                ...this.state,
                isFetching: false
            }
        }
        else {
            return { ...this.state }
        }
    }

    // 검색한 유저 정보 확인 
    _searchUserInfo = () => {

    }

    // 검색한 유저에게 교환일기 요청 
    _exchangeRequest = () => {

    }

    // 취소 선택
    _cancel = () => {

    }

    _changeSerarchValue = (text) => {
        console.log("_changeSerarchValue() : " + text);
        this.setState({ searchValue: text });
    }

    // 유저 검색 시
    _userSearch = async () => {
        console.log("_userSearch()");
        const { selectUser } = this.props;
        await selectUser(this.state.searchValue);

        this.setState({
            isFetching: true
        });
    
        // 검색란 초기화
        this.setState({ searchValue: '' });
    }

}


export default Action;