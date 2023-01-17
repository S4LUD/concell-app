import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import NotificationScreen from "../shared/NotificationComponents/Notification";

const NotificationStack = createStackNavigator();

export default function NotificationStacksScreen({ navigation, route }) {
  return (
    <NotificationStack.Navigator
      initialRouteName="Schedule_Home"
      screenOptions={{
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <NotificationStack.Screen
        name="Notification_Home"
        component={NotificationScreen}
        options={{
          title: "Notifications",
          headerShadowVisible: false,
        }}
      />
    </NotificationStack.Navigator>
  );
}
