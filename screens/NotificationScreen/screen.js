import React from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
} from "react-native";
import Modal from 'react-native-modal';


const NotificationScreen = props => (
    <View style={styles.container}>
        {props.notificationList.length > 0 ?
            <FlatList
                data={props.notificationList}
                keyExtractor={(item) => item.msg_num.toString()}
                refreshing={props.isFetching}
                onRefresh={props.refresh}
                renderItem={({ item }) =>
                    <View>
                        <View style={styles.line} />
                        <TouchableOpacity onPressOut={() => {props.toggleModalVisible(
                            item.inviter, // 초대자의 닉네임
                            item.ex_title // 교환일기의 타이틀 
                        )}}>
                            <Text> 교환 신청이 왔어요 </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>"{item.inviter}" 님에게 교환신청이 왔어요 </Text>
                                <Text> {item.send_date.substring(0, 10)}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.line} />
                    </View>
                }
            /> : <Text style={styles.nonNotificationText}>알림이 없습니다</Text>
        }
         {props.isModalVisible ?
            <Modal isVisible={props.isModalVisible}
                animationInTiming={500}
                onSwipeComplete={props.toggleModalVisible}
            >
                <View style={{ backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <View>
                        <Text>교환일기 제목 {props.ex_title}</Text>
                        <Text>초대자 : {props.inviter}</Text>
                        <Text>이 다이어리는..</Text>
                    </View>
                    <Text>수락하시겠습니까?</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPressOut={props.toggleModalVisible} style={styles.modalbutton}>
                            <Text>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPressOut={() =>{}}
                            style={styles.modalbutton}>
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
    line: {
        backgroundColor: 'powderblue',
        height: 2,
        width: '95%',
        marginLeft: 6,
        marginBottom: 10
    },
    modalbutton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    nonNotificationText: {
        color: "grey",
        fontSize: 17,
        fontWeight:"bold"
    }
});


export default NotificationScreen;