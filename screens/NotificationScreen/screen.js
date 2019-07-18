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


const NotificationScreen = props => (
    <View>
        <Text>알림!!!!!!</Text>
        {props.notificationList.length !== 0 ? 
            <FlatList
                data={props.notificationList}
                keyExtractor={(item) => item.msg_num.toString()}
                refreshing={props.isFetching}
                onRefresh={props.refresh}
                renderItem={({ item }) => <Text>{item.ex_title}</Text>}
            /> : <Text>알림이 없습니다.</Text>
        }

    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});


export default NotificationScreen;