import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import AuthenticationScreenComponent from "./Authentication";

const AuthenticationStack = createStackNavigator();

export default function AuthenticationScreen() {
  return (
    <AuthenticationStack.Navigator
      initialRouteName="AuthenticationScreen"
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <AuthenticationStack.Screen
        name="AuthenticationScreen"
        component={AuthenticationScreenComponent}
      />
    </AuthenticationStack.Navigator>
  );
}
