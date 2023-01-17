import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import SettingsScreen from "../shared/SettingsComponents/Settings";
import ProfileDetailsScreen from "../shared/SettingsComponents/ProfileDetails";
import SchoolNumber from "../shared/SettingsComponents/SchoolNumber";
import MyName from "../shared/SettingsComponents/MyName";
import ManageAccount from "../shared/SettingsComponents/ManageAccount";
import MyEmail from "../shared/SettingsComponents/MyEmail";
import MyPassword from "../shared/SettingsComponents/MyPassword";

const SettingsScreenStack = createStackNavigator();

export default function SettingsStack({ navigation, route }) {
  const noTabs = [
    "Profile_Details",
    "Change_Details",
    "SchoolNumber",
    "MyName",
    "ManageAccount",
    "MyEmail",
    "MyPassword",
  ];
  useLayoutEffect(() => {
    if (noTabs.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({
        tabBarStyle: { display: "none" },
      });
    } else {
      navigation.setOptions({
        tabBarStyle: { display: "flex", borderTopWidth: 0 },
      });
    }
  }, [navigation, route]);

  return (
    <SettingsScreenStack.Navigator
      initialRouteName="Settings_Home"
      screenOptions={{
        headerStyle: {
          borderBottomWidth: 0.5,
          borderBottomColor: "#EEEDED",
        },
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsScreenStack.Screen
        name="Settings_Home"
        component={SettingsScreen}
        options={{
          title: "Settings",
          headerStyle: {
            borderBottomWidth: 0.6,
            borderBottomColor: "#EEF2F6",
          },
        }}
      />
      <SettingsScreenStack.Screen
        name="Profile_Details"
        component={ProfileDetailsScreen}
        options={{
          title: "Edit Profile",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
          },
          headerStyle: {
            borderBottomWidth: 0.6,
            borderBottomColor: "#EEF2F6",
          },
        }}
      />
      <SettingsScreenStack.Screen
        name="SchoolNumber"
        component={SchoolNumber}
        options={{
          title: "School Number",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
          },
          headerStyle: {
            borderBottomWidth: 0.6,
            borderBottomColor: "#EEF2F6",
          },
        }}
      />
      <SettingsScreenStack.Screen
        name="MyName"
        component={MyName}
        options={{
          title: "Name",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
          },
          headerStyle: {
            borderBottomWidth: 0.6,
            borderBottomColor: "#EEF2F6",
          },
        }}
      />
      <SettingsScreenStack.Screen
        name="ManageAccount"
        component={ManageAccount}
        options={{
          title: "Manage My Account",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
          },
          headerStyle: {
            borderBottomWidth: 0.6,
            borderBottomColor: "#EEF2F6",
          },
        }}
      />
      <SettingsScreenStack.Screen
        name="MyEmail"
        component={MyEmail}
        options={{
          title: "Email",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
          },
          headerStyle: {
            borderBottomWidth: 0.6,
            borderBottomColor: "#EEF2F6",
          },
        }}
      />
      <SettingsScreenStack.Screen
        name="MyPassword"
        component={MyPassword}
        options={{
          title: "Password",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: "700",
          },
          headerStyle: {
            borderBottomWidth: 0.6,
            borderBottomColor: "#EEF2F6",
          },
        }}
      />
    </SettingsScreenStack.Navigator>
  );
}
