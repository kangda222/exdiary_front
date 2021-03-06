import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from 'react-native-gesture-handler';
import CNRichTextEditor, { CNToolbar, getDefaultStyles } from "react-native-cn-richtext-editor";
import Modal from 'react-native-modal';

const defaultStyles = getDefaultStyles();

const WritingDiaryScreen = props => {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', padding: 5 }}>
                <Text style={styles.titleFont}>제목 : </Text>
                <TextInput placeholder='제목을 입력해주세요' value={props.title} name='title' maxLength={50}
                    style={{ width: '70%', fontSize: 22 }}
                    onChangeText={props.onTitleChanged}
                    onFocus={props.focused}
                    onEndEditing={props.unfocused}
                />
                {(props.diary_num && props.page_num) ? <TouchableOpacity style={styles.button} onPressOut={() => {
                    props.changeContent();
                }
                }><Text>수정</Text></TouchableOpacity> :
                    <TouchableOpacity style={styles.button}
                        onPressOut={() => {
                            props.insertContents();
                        }}><Text>저장</Text></TouchableOpacity>
                }
            </View>

            <View style={styles.line}></View>

            <KeyboardAvoidingView behavior={'padding'} keyboardVerticalOffset={70} style={styles.editorArea}>
                <View style={styles.main}>
                    <CNRichTextEditor
                        ref={props.inputEditor}
                        onSelectedTagChanged={props.onSelectedTagChanged}
                        onSelectedStyleChanged={props.onSelectedStyleChanged}
                        value={props.contents}
                        style={{ backgroundColor: '#fff' }}
                        styleList={defaultStyles}
                        onValueChanged={props.onValueChanged}
                        onRemoveImage={props.onRemoveImage}
                    />
                </View>
                <View>
                    {props.focused_title ?
                        null :
                        <CNToolbar
                            size={28}
                            bold={<Text style={[styles.toolbarButton, styles.boldButton]}>B</Text>}
                            italic={<Text style={[styles.toolbarButton, styles.italicButton]}>I</Text>}
                            underline={<Text style={[styles.toolbarButton, styles.underlineButton]}>U</Text>}
                            lineThrough={<Text style={[styles.toolbarButton, styles.lineThroughButton]}>S</Text>}
                            body={<Text style={styles.toolbarButton}>T</Text>}
                            ul={<Text style={styles.toolbarButton}>ul</Text>}
                            ol={<Text style={styles.toolbarButton}>ol</Text>}
                            image={<Ionicons name="ios-image" size={28} color="#737373" onPress={props.toggleModal} />}
                            selectedTag={props.selectedTag}
                            selectedStyles={props.selectedStyles}
                            onStyleKeyPress={props.onStyleKeyPress} />
                    }
                </View>
            </KeyboardAvoidingView>

            {props.isModalVisible ?
                <View >
                    <Modal isVisible={props.isModalVisible}
                        backdropColor={'white'}
                        backdropOpacity={9.0}
                        animationInTiming={500}
                    >
                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                onPressOut={props.handleChoosePhoto}
                                style={{ alignSelf: 'center', marginTop: 50, }}>
                                <Text style={styles.modalText}>갤러리</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalLine}></View>

                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                onPressOut={props.handelChooseVideo}
                                style={{ alignSelf: 'center', marginTop: 50, }}>
                                <Text style={styles.modalText}>비디오 </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalLine}></View>

                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                onPress={props.handleCamera}
                                style={{ alignSelf: 'center', marginTop: 50, }}>
                                <Text style={styles.modalText}>카메라</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalLine}></View>

                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                onPressOut={props.toggleModal}
                                style={{ alignSelf: 'center', marginTop: 50, }}>
                                <Text style={styles.modalText}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View> : null
            }
        </View>
    )
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        width: 40,
        height: 30,
        backgroundColor: 'powderblue',
        marginTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    line: {
        backgroundColor: 'grey',
        height: 1,
        width: '95%',
        marginLeft: 6,
        marginBottom: 10
    },
    text: {
        fontSize: 35,
        fontWeight: 'bold',
        padding: 20
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalLine: {
        backgroundColor: 'powderblue',
        height: 2,
        width: '100%',
    },
    modalText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'powderblue',
    },
    // 편집기 관련 CSS 
    editorArea: {
        flex: 1,
        backgroundColor: '#eee',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    main: {
        flex: 1,
        paddingBottom: 1,
        alignItems: 'stretch',
    },
    toolbarButton: {
        fontSize: 20,
        width: 28,
        height: 28,
        textAlign: 'center'
    },
    italicButton: {
        fontStyle: 'italic'
    },
    boldButton: {
        fontWeight: 'bold'
    },
    underlineButton: {
        textDecorationLine: 'underline'
    },
    lineThroughButton: {
        textDecorationLine: 'line-through'
    },
    titleFont: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 5,
        paddingTop: 5,
    },
});

export default WritingDiaryScreen;