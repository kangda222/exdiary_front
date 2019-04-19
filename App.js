import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppLoading, Font, Asset } from "expo";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AppContainer from "./components/AppContainer";

class App extends React.Component {
  state = {
    isLoadingComplete: false
  };
  render() {
    const { isLoadingComplete } = this.state;
    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    }
    return <AppContainer />;
  }

  _loadAssetsAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        ...Ionicons.font,
        ...MaterialIcons.font
      })
    ]);
  };
  _handleLoadingError = error => {
    console.error(error);
  };
  _handleFinishLoading = async () => {
    this.setState({
      isLoadingComplete: true
    });
  };
}

export default App;
