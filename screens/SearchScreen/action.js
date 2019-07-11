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
        exDiaryTitleList: [], 
        exDiaryDiary_Num:[],
        inviter: '', // 초대자 닉네임 
        inv_email: '', // 초대자 이메일 
        selectedIndex:0, // 선택한 교환 일기 index값 
    }

    render() {
        return (
            <UserSearchScreen
                {...this.props}
                {...this.state}
                userSearch={this._userSearch}
                changeSerarchValue={this._changeSerarchValue}
                exchangeRequest={this._exchangeRequest}
                toggleUserInfoModalVisible={this._toggleUserInfoModalVisible}
                toggleModalVisible={this._toggleModalVisible}
                getSelectedIndeX={this._getSelectedIndeX}
            />
        );
    }

    // 선택한 옵션 index 값 설정 
    _getSelectedIndeX = (index) => {
        this.setState({selectedIndex: index});
        console.log("선택한 옵션의 index : " + this.state.selectedIndex);
    }

    
    // 유저 정보 확인 모달 Toggle
    _toggleUserInfoModalVisible = (user_num, email, joindate, phoneNumber, profile_img, nickname, gender) => {
        console.log("유저 정보 확인 모달 : " + JSON.stringify(this.props.userList) + " , user_num: " + user_num + ", joindate: " + joindate);
        this.setState({
            isUserInfoModalVisible: !this.state.isUserInfoModalVisible,
            user_num: user_num,
            email: email,
            joindate: joindate,
            phoneNumber: phoneNumber,
            profile_img: profile_img,
            nickname: nickname,
            gender: gender
        });
    }


    // 교환 신청 모달 Toggle
    _toggleModalVisible = async (nickname, user_num) => {
        const { getDiary, profile } = this.props;
        await getDiary();

        // 현재 접속중인 사용자의 닉네임, 이메일 뽑아오기 
        console.log("profile : " + JSON.stringify(profile.nickname) + "inv_email : " + JSON.stringify(profile.email));

        // 모달에 있는 DropBox에 옵션 값으로 넣어주기 위해 배열로 담아서 그려줌 
        if (this.props.exDiary.length !== 0) {
            for (var i = 0; i < this.props.exDiary.length; i++) {
                this.state.exDiaryTitleList[i] = JSON.stringify(this.props.exDiary[i].diary_title);
                this.state.exDiaryDiary_Num[i] = JSON.stringify(this.props.exDiary[i].diary_num);
            }
            this.setState({ isModalVisible: !this.state.isModalVisible, inviter: profile.nickname, nickname: nickname, inv_email:profile.email, user_num:user_num});
        }else {
            alert("교환일기를 먼저 생성해 주세요");
        }
    }

    // 검색한 유저에게 교환일기 요청 
    _exchangeRequest = async() => {
        console.log("exchangeRequest() : "+ this.state.inviter + ", " + this.state.inv_email);
        const { sendExchangeRequest } = this.props;

        if(this.state.selectedIndex >= 0){
            const result = await sendExchangeRequest(
                this.state.exDiaryTitleList[this.state.selectedIndex],
                this.state.exDiaryDiary_Num[this.state.selectedIndex],
                this.state.user_num,
                this.state.inviter
            );
        }
        
        this.setState({ isModalVisible: !this.state.isModalVisible});
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