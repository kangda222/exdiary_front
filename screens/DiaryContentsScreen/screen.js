import React from "react";
import PropTypes from "prop-types";
import { StyleSheet,Text, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CNRichTextView from "react-native-cn-richtext-editor/src/CNRichTextView";

// 일기 내용 보여주기 
const DiaryContentsScreen = props => (
    <View style={styles.main}>
        <CNRichTextView
            //text={props.diaryContent}
            // convertToHtmlString={props.diaryContent}
            style={{flex:1}} />
    </View>
);

DiaryContentsScreen.prototypes = {

};


const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingBottom: 1,
        alignItems: 'stretch',
    },
})

export default DiaryContentsScreen;