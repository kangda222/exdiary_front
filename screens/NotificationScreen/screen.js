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
        <FlatList
                data={props.notificationList}
                keyExtractor={(item) => item.user_num.toString()}
                refreshing={props.isFetching}
                onRefresh={props.refresh}
                renderItem={({ item }) => <Text>{item}</Text>}
        />
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