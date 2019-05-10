import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList
} from "react-native";
import PropTypes from "prop-types";

const DiarylistScreen = props => (
  <View>
    <Text>DiarylistScreen</Text>
    <FlatList
      data={props.diaryList}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity>
          <Text>${item.title}</Text>
        </TouchableOpacity>
      )}
    />
  </View>
);

DiarylistScreen.proptypes = {
  diaryList: PropTypes.array.isRequired
};

export default DiarylistScreen;
