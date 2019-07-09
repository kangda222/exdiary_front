import React, { Component } from "react";
import UserSearchScreen from './screen';

class Action extends Component {

    state = {
        searchValue: '',
        userList: (this.props.userList) ? this.props.userList : [],
        isFetching: false,
        isModalVisible: false,
        isUserInfoModalVisible: false,
        user_num: '',
        email: '',
        joindate: '',
        phoneNumber: '',
        profile_img: '',
        nickname: '',
        gender: '',
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
                toggleUserInfoModalVisible={this._toggleUserInfoModalVisible}
                toggleModalVisible={this._toggleModalVisible}
            />
        );
    }

    // 검색한 유저 정보 확인 
    _searchUserInfo = () => {

    }
    // 유저 정보 확인 모달 Toggle
    _toggleUserInfoModalVisible = (user_num, email, joindate, phoneNumber, profile_img, nickname, gender) => {
        console.log("유저 정보 확인 모달 : " + JSON.stringify(this.props.userList) + " , user_num: " + user_num + ", joindate: " + joindate);
        this.setState({
            isUserInfoModalVisible: !this.state.isUserInfoModalVisible,
            email: email,
            joindate: joindate,
            phoneNumber: phoneNumber,
            profile_img: profile_img,
            nickname: nickname,
            gender: gender
        });
    }


    // 교환 신청 모달 Toggle
    _toggleModalVisible = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    }

    // 검색한 유저에게 교환일기 요청 
    _exchangeRequest = () => {
        console.log("exchangeRequest()");

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