import { createStackNavigator, createAppContainer } from "react-navigation";
import LogInScreen from "../screens/LogInScreen";
import SignupScreen from "../screens/SignupScreen";

const LoggedOutNavigation = createStackNavigator({
  LogIn: {
    screen: LogInScreen,
    navigationOptions: {
      title: "Log In"
    }
  },
  SignUp: {
    screen: SignupScreen,
    navigationOptions: {
      title: "Sign Up"
    }
  }
});

export default createAppContainer(LoggedOutNavigation);
