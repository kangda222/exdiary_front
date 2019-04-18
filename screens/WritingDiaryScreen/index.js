import React from 'react';
import {StyleSheet, Text, View, heigth, width} from 'react-native';

const WritingDiaryScreen = () => (
    <View styles={styles.container}>
        <View style={{flexDirection:'row', justifyContent: "space-around",padding:5}}>
            <Text>내 일기</Text>
            <View style={{ backgroundColor:'powderblue', height:10,  width:'90%'}}></View> 
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        flexDirection:'column'
    },
    elem: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor:'powderblue',
        borderBottomWidth:0.5,
        padding: 5,
    }
});

export default WritingDiaryScreen;