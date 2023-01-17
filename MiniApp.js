import React, { useContext } from "react";
import AuthenticationScreen from "./src/components/Authentication";
import ConcellContext from "./src/context/Context";
import MainComponent from "./src/components/MainComponent";
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import AdminStackScreen from "./src/components/Admin";
import * as NavigationBar from "expo-navigation-bar";

const ConcellStack = createStackNavigator();

export default function MiniApp() {
  const { isState } = useContext(ConcellContext);

  NavigationBar.setBackgroundColorAsync("#0F0F0F");

  return (
    <ConcellStack.Navigator
      initialRouteName="Authentication"
      screenOptions={{
        headerShown: false,
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {isState.status ? (
        isState.position === "admin" ? (
          <ConcellStack.Screen
            name="administrator"
            component={AdminStackScreen}
          />
        ) : (
          <ConcellStack.Screen
            name="AuthenticationGranted"
            component={MainComponent}
          />
        )
      ) : (
        <ConcellStack.Screen
          name="Authentication"
          component={AuthenticationScreen}
        />
      )}
    </ConcellStack.Navigator>
  );
}
