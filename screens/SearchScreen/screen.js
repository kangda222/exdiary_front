import React from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import OptionsMenu from "react-native-options-menu"
import Modal from 'react-native-modal';
import ModalDropdown from 'react-native-modal-dropdown';
const MoreIcon = require("../../assets/images/icon_receiptpay.png");


const UserSearchScreen = props => (
    <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
            <TextInput
                style={styles.TextInput}
                maxLength={10}
                value={props.searchValue}
                onChangeText={props.changeSerarchValue}
                placeholder='유저의 닉네임을 입력하세요'
                onSubmitEditing={Keyboard.dismiss}
            />
            <Ionicons name='ios-search' size={30} onPress={() => {
                Keyboard.dismiss();
                props.userSearch();
            }} />
        </View>
        {props.userList ?
            <>
                <FlatList
                    data={props.userList}
                    keyExtractor={(item) => item.user_num.toString()}
                    refreshing={props.isFetching}
                    onRefresh={props.userSearch}
                    renderItem={({ item }) => (
                        // 프로필 이미지 추가 필요 
                        <View style={{ flexDirection: 'row' }}>
                            <Text>{item.nickname} </Text>
                            <Text>{item.email}</Text>
                            <OptionsMenu
                                button={MoreIcon}
                                buttonStyle={{ width: 20, height: 20, margin: 7.5, resizeMode: "contain" }}
                                //destructiveIndex={1}
                                options={["정보", "교환일기 신청", "취소"]}
                                actions={[() => {
                                    props.toggleUserInfoModalVisible(
                                        item.user_num,
                                        item.email,
                                        item.joindate,
                                        (item.phoneNumber !== null || item.phoneNumber !== '') ? item.phoneNumber : '',
                                        (item.profile_img !== null || item.profile_img !== '') ? item.profile_img : '',
                                        item.nickname,
                                        (item.gender !== null || item.gender !== '') ? item.gender : '',
                                    )
                                }, () => {props.toggleModalVisible(
                                        item.user_num
                                )}, props.cancel]}
                            />
                        </View>
                    )} />
            </> : <Text>친구를 검색해보세요!</Text>}
        {props.isUserInfoModalVisible ?
            <Modal isVisible={props.isUserInfoModalVisible}
                animationInTiming={500}
                onSwipeComplete={props.toggleUserInfoModalVisible}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                        {props.profile_img ? <Text>{props.profile_img}</Text> : <Text>디폴트 이미지 준비필요</Text>}

                        <Text>{props.email}</Text>

                        <Text>{props.nickname}</Text>

                        {props.phoneNumber ? <Text>{props.phoneNumber}</Text> : <Text>비밀이에욤</Text>}

                        {props.phoneNumber ? <Text>{props.gender}</Text> : <Text>비밀이에욤</Text>}

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPressOut={props.toggleUserInfoModalVisible} style={styles.modalbutton}>
                            <Text>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={props.submitDiaryInfo} style={styles.modalbutton}>
                            <Text>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            : null}
        {props.isModalVisible ?
            <Modal isVisible={props.isModalVisible}
                animationInTiming={500}
                onSwipeComplete={props.toggleModalVisible}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                        {props.exDiary.length !== 0 ? <ModalDropdown options={props.exDiaryList}
                            defaultValue={"내 교환일기 선택"}
                        /> : <Text>선택 할 교환일기가 존재하지 않습니다.</Text>}
                    
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPressOut={props.toggleModalVisible} style={styles.modalbutton}>
                            <Text>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={props.submitDiaryInfo} style={styles.modalbutton}>
                            <Text>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            : null}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    TextInput: {
        borderRadius: 5,
        marginBottom: 2,
        marginRight: 5,
        borderBottomColor: 'red',
        borderBottomWidth: 1,
    },
    modalbutton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
});

export default UserSearchScreen;