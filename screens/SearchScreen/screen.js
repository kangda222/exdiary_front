import React from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Keyboard
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import OptionsMenu from "react-native-options-menu"
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
        {props.userList !== null ?
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
                                actions={[props.searchUserInfo, props.exchangeRequest, props.cancel]}
                            />
                        </View>
                    )} />
            </> : <Text>친구를 검색해보세요!</Text>}
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
    }
});

export default UserSearchScreen;