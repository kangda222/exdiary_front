import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, StatusBar} from "react-native";
import RootNavigation from "../../navigation/RootNavigation";
import LoggedOutNavigation from "../../navigation/LoggedOutNavigation";

class AppContainer extends Component {
  static propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    initApp: PropTypes.func.isRequired
  };
  componentDidMount() {
    const { isLoggedIn, initApp } = this.props;
    if (isLoggedIn) {
      initApp();
    }
  }

  render() {
    const { isLoggedIn } = this.props;
    console.log("appContainer isLoggedIn :: " + isLoggedIn);
    return (
        <View style={styles.container}>
          <StatusBar hidden={false} />
          {isLoggedIn ? <RootNavigation /> : <LoggedOutNavigation />}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default AppContainer;
