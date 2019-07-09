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
        exDiaryList: [],
        inviter: '' // 초대자 
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
    _toggleModalVisible = async (user_num, nickname) => {
        const { getDiary, profile } = this.props;
        await getDiary();

        // 현재 접속중인 사용자 닉네임 뽑아오기
        console.log("profile : " + JSON.stringify(profile.nickname) + " user_num : "+ user_num);

        // 모달에 있는 DropBox에 옵션 값으로 넣어주기 위해 배열로 담아서 그려줌 
        if (this.props.exDiary.length !== 0) {
            for (var i = 0; i < this.props.exDiary.length; i++) {
                this.state.exDiaryList[i] = JSON.stringify(this.props.exDiary[i].diary_title);
            }
        }
        this.setState({ isModalVisible: !this.state.isModalVisible, inviter: profile.nickname, nickname:nickname });
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