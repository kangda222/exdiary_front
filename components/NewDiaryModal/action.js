import React, { Component } from "react";
import Modal from "react-native-modal";
import {
    Text,
    View,
    TouchableOpacity,
    Switch,
    Alert
} from "react-native";
import styled from "styled-components/native";

class Action extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalVisible: false,
            explanation: null,
            diary_title: null,
            diary_type: 'default',
            diary_num: null,
            switchValue:false
        }
    }

    render() {
        return (
            <Modal isVisible={this.state.isModalVisible}
                animationInTiming={500}
                onSwipeComplete={() => this.state._toggleModal()}
            >
                {!this.state.isModalVisible ? (
                    <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ marginBottom: 5 }}>제목</Text>
                            <TextInput maxLength={20}
                                placeholder='일기장 제목을 입력해주세요'
                                value={this.state.diary_title}
                                onChangeText={ () => this.state._onTitleChanged()}
                            />
                            <Text style={{ marginBottom: 5 }}>이 일기는..</Text>
                            <TextInput multiline={true} maxLength={40} numberOfLines={2}
                                placeholder='일기장에 대한 설명을 적어주세요 (최대 40자 까지 가능)'
                                value={this.state.explanation}
                                onChangeText={ () => this.state._onExplanationChanged()}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>교환일기 여부</Text>
                            <Switch onValueChange={ () => this.state._handleToggleSwitch()}
                                value={this.state.switchValue}
                            />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPressOut={ () => this.state._toggleModal()}>
                                <Text>취소</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPressOut={() => this.state._submitDiaryInfo()}>
                                <Text>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
            </Modal>
        )
    }

    _toggleModal = () => {
        this.setState({
            isModalVisible: !this.state.isModalVisible,
            diary_title: null,
            diary_type: "default",
            explanation: null,
            switchValue: false
        });
    }

    // 일기장 제목 입려 시 
    _onTitleChanged = (text) => {
        this.setState({ diary_title: text });
    }

    // 일기장 설명 입력 시 
    _onExplanationChanged = (text) => {
        this.setState({ explanation: text });
    }

    // 일기장 생성 시 
    _submitDiaryInfo = () => {
        const { getDiary, myDiary, exDiary, token } = this.props;
        let url = 'http://192.168.245.1:8080/diary/insertDiaryInfo';
        if ((this.state.diary_type === "default" && myDiary.length === 0) ||
            (this.state.diary_type === "exchange" && exDiary.length < 5)) {
            fetch(url, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    "authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    user_num: '1',
                    email: 'qwerty@naver.com',
                    diary_type: this.state.diary_type,
                    diary_title: this.state.diary_title,
                    explanation: this.state.explanation
                }),
            })
                .then((response) => response.json())
                .then(response => {
                    if (JSON.stringify(response) > 0 && this.state.diary_title !== 'null') {
                        alert('일기장이 생성 되었습니다');
                        getDiary();
                        this._toggleModal();
                    }
                    else {
                        alert('제목을 입력해 주세요');
                    }
                }).catch(e => e)
        } else {
            if (myDiary.length > 0) {
                alert("나의 일기장은 한개만 생성 가능합니다.");
            }
            else {
                alert("교환일기는 최대 5개까지 생성 가능합니다.");
            }
            this._toggleModal();
        }
    }

    // 교환일기 여부 선택 시 
    _handleToggleSwitch = () => {
        this.setState({
            switchValue: !this.state.switchValue
        })

        if (this.state.switchValue) {
            this.setState({
                diary_type: 'default'
            })
        } else {
            this.setState({

                diary_type: 'exchange'
            })
        }
    }

    // 일기장 수정 시 
    _editDiaryInfo = () => {
        const { updateDiaryInfo } = this.props;
        console.log("_editDiaryInfo() :" + this.props.diary_num, +"," + this.props.diary_title + "," + this.props.explanation);
        updateDiaryInfo(this.props.diary_num, this.props.diary_title, this.props.explanation);
    }

}



const TouchableOpacity = styled.View`
width: '50%',
alignItems: 'center',
justifyContent: 'center',
marginTop: 10
`;
const TextInput = styled.TextInput`
width: '50%',
borderRadius: 5,
marginBottom: 2,
marginRight: 5,
borderBottomColor: 'red',
borderBottomWidth: 1,
`;
