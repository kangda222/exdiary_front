import React, { Component } from "react";
import NotificationScreen from './screen';

class Action extends Component {
    state = {
        isFetching: false,
        mynotificationList: this.props.notificationList,
        isModalVisible: false,
        ex_title: '',
        ex_diary_num: '',
        inviter: ''
    }

    componentDidMount() {
        const { _setNotification } = this.props;
        _setNotification();
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.notificationList.length !== prevState.mynotificationList.length) {
            console.log('getDerivedStateFromProps() List Update...');
            return {
                ...this.state,
                isFetching: false
            }
        }
        else {
            return { ...this.state }
        }
    }


    render() {
        return (
            <NotificationScreen
                {...this.props}
                {...this.state}
                refresh={this._refresh}
                toggleModalVisible={this._toggleModalVisible}
            />
        );
    }

    _refresh = async () => {
        const { _setNotification } = this.props;
        await _setNotification();
        this.setState({
            isFetching: true
        });
    };

    // 알림 선택 시 모달 toggle
    _toggleModalVisible = async(inviter, ex_title) => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
            inviter: inviter,
            ex_title: ex_title
        });
    }

}

export default Action;