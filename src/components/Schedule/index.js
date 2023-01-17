import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ScheduleMainScreen from "../shared/ScheduleComponents/ScheduleMainScreen";
import ScheduleContainerScreen from "../shared/ScheduleComponents/ScheduleContainerScreen";
import { useLayoutEffect } from "react";

const ScheduleStack = createStackNavigator();

export default function ScheduleStacksScreen({ navigation, route }) {
  const noTabs = ["Schedule_Container"];
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
    <ScheduleStack.Navigator
      initialRouteName="Schedule_Home"
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
      <ScheduleStack.Screen
        name="Schedule_Home"
        component={ScheduleMainScreen}
        options={{
          title: "Schedules",
          headerStyle: {
            borderBottomWidth: 0.6,
            borderBottomColor: "#EEF2F6",
          },
        }}
      />
      <ScheduleStack.Screen
        name="Schedule_Container"
        component={ScheduleContainerScreen}
        options={{
          title: "Details",
          headerStyle: {
            borderBottomWidth: 0.6,
            borderBottomColor: "#EEF2F6",
          },
        }}
      />
    </ScheduleStack.Navigator>
  );
}
