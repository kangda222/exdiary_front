import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import TabsNavigation from "./TabsNavigation";
import { Ionicons } from "@expo/vector-icons";
import WritingScreen from "../screens/WritingDiaryScreen";
import { TouchableOpacity, Text, View } from "react-native";
import Modal from "../components/Modal";

const RootNavigation = createStackNavigator(
  {
    Tabs: {
      screen: TabsNavigation,
      navigationOptions: props => ({
        title: "교환일기",
        headerRight: (
          <View>
            <TouchableOpacity
              onPressOut={() => {
                //console.log(props);
                props.screenProps.toggleModal();
              }}
            >
              <Ionicons name="ios-contact" size={30} />
            </TouchableOpacity>
            <Modal
              isModalVisible={props.screenProps.isModalVisible}
              toggleModal={props.screenProps.toggleModal}
              profile={props.screenProps.profile}
            />
          </View>
        )
      })
    },
    WritingScreen: {
      screen: WritingScreen,
      navigationOptions: {
        title: "글 작성"
      }
    }
  },
  {
    mode: "card",
    defaultNavigationOptions: {
      gesturesEnabled: true
    }
  }
);

export default createAppContainer(RootNavigation);
