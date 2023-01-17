import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import ScheduleStacksScreen from "../Schedule";
import HomeStack from "../Home";
import SettingsStack from "../Settings";
import NotificationStacksScreen from "../Notification";

export default function MainComponent() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Notification") {
            iconName = focused
              ? "ios-notifications-circle"
              : "ios-notifications-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-settings-sharp" : "ios-settings-outline";
          } else if (route.name === "Schedule") {
            iconName = focused ? "ios-book-sharp" : "ios-book-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#212121",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Schedule"
        options={{
          headerShown: false,
        }}
        component={ScheduleStacksScreen}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationStacksScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
