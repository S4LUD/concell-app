import { Pressable, View, Linking } from "react-native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { useContext, useLayoutEffect } from "react";
import CreateScheduleScreen from "../shared/Home/CreateSchedule";
import HomeScreen from "../shared/Home/Home";
import RoomDetailsScreen from "../shared/Home/RoomDetails";
import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import MemberScreen from "../shared/Home/MemberScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import CreateRoom from "../shared/Home/CreateRoom";
import ConcellContext from "../../context/Context";
import ScheduleDetails from "../shared/Home/ScheduleDetails";
import JoinRoom from "../shared/Home/JoinRoom";
import RoomComments from "../shared/Home/RoomComments";

const HomeScreenStack = createStackNavigator();

export default function HomeStack({ navigation, route }) {
  const { isState } = useContext(ConcellContext);
  const noTabs = [
    "Members",
    "Room_Details",
    "Create_Schedule",
    "Home_Prevent_Back",
    "Room_Members",
    "CreateRoom",
    "ScheduleDetails",
    "JoinRoom",
    "RoomComment",
  ];
  useLayoutEffect(() => {
    if (noTabs.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({
        tabBarStyle: { display: "none" },
      });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          display: "flex",
          borderTopWidth: 0,
        },
      });
    }
  }, [navigation, route]);

  return (
    <HomeScreenStack.Navigator
      initialRouteName="Room_Home"
      screenOptions={{
        transitionSpec: {
          open: TransitionSpecs.TransitionIOSSpec,
          close: TransitionSpecs.TransitionIOSSpec,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerTintColor: "#000000",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "700",
          color: "#000000",
          textTransform: "uppercase",
        },
        headerShadowVisible: false,
      }}
    >
      <HomeScreenStack.Screen
        name="Room_Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: "center",
          headerTitle: "CONCELL",
          headerTitleStyle: {
            fontWeight: "900",
            fontSize: 22,
            color: "#000000",
          },
          headerRight:
            isState.position === "faculty"
              ? () => {
                  return (
                    <Pressable
                      onPress={() => navigation.navigate("CreateRoom")}
                      style={{ marginRight: 13 }}
                    >
                      <Ionicons
                        name="ios-create-outline"
                        size={24}
                        color="#000000"
                      />
                    </Pressable>
                  );
                }
              : () => {
                  return (
                    <Pressable
                      onPress={() => navigation.navigate("JoinRoom")}
                      style={{ marginRight: 13 }}
                    >
                      <Ionicons
                        name="ios-add-outline"
                        size={25}
                        color="#000000"
                      />
                    </Pressable>
                  );
                },
          headerLeft: () => {
            return (
              <Pressable
                style={{ marginLeft: 13 }}
                onPress={() =>
                  Linking.openURL("content://com.android.calendar/time/")
                }
              >
                <Ionicons
                  name="ios-calendar-outline"
                  size={24}
                  color="#000000"
                />
              </Pressable>
            );
          },
        }}
      />
      <HomeScreenStack.Screen
        name="Room_Details"
        component={RoomDetailsScreen}
        options={{
          title: "Details",
          headerRight: () => {
            return (
              <View style={{ marginRight: 13, flexDirection: "row" }}>
                {isState.position === "faculty" && (
                  <Pressable
                    onPress={() => navigation.navigate("Create_Schedule")}
                    style={{ marginRight: 13 }}
                  >
                    <Ionicons name="ios-create-outline" size={24} />
                  </Pressable>
                )}
                <Pressable onPress={() => navigation.navigate("Room_Members")}>
                  <Ionicons name="people-outline" size={24} />
                </Pressable>
              </View>
            );
          },
        }}
      />
      <HomeScreenStack.Screen
        name="Create_Schedule"
        component={CreateScheduleScreen}
        options={{
          title: "Create Schedule",
        }}
      />
      <HomeScreenStack.Screen
        name="Room_Members"
        component={MemberScreen}
        options={{
          title: "Room Members",
        }}
      />
      <HomeScreenStack.Screen
        name="CreateRoom"
        component={CreateRoom}
        options={{
          title: "Create Room",
        }}
      />
      <HomeScreenStack.Screen
        name="ScheduleDetails"
        component={ScheduleDetails}
        options={{
          title: "Schedule Details",
          headerRight: () => {
            return (
              <Pressable
                style={{ marginRight: 13 }}
                onPress={() => navigation.navigate("RoomComment")}
              >
                <Ionicons
                  name="ios-chatbox-ellipses-outline"
                  size={24}
                  color="#000000"
                />
              </Pressable>
            );
          },
        }}
      />
      <HomeScreenStack.Screen
        name="RoomComment"
        component={RoomComments}
        options={{
          title: "Comments",
        }}
      />
      <HomeScreenStack.Screen
        name="JoinRoom"
        component={JoinRoom}
        options={{
          title: "Join Room",
        }}
      />
    </HomeScreenStack.Navigator>
  );
}
