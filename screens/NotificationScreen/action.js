import React, { Component } from "react";
import NotificationScreen from './screen';

class Action extends Component {
    state = {
        isFetching: false,
        mynotificationList: this.props.notificationList
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

}

export default Action;