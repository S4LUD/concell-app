import {
  createStackNavigator,
  TransitionSpecs,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import HomeScreen from "./AdminComponent/Home";
import MemberDetailsScreen from "./AdminComponent/MemberDetailsScreen";
import Memberscreen from "./AdminComponent/MemberScreen";
import RegisterFaculty from "./AdminComponent/RegisterFaculty";

const AdminStack = createStackNavigator();

export default function AdminStackScreen({ navigation, route }) {
  return (
    <AdminStack.Navigator
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
      <AdminStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "CONCELL ADMINISTRATOR",
          headerTitleAlign: "center",
        }}
      />
      <AdminStack.Screen
        name="Users"
        component={Memberscreen}
        options={{
          headerTitleAlign: "center",
          headerTitleStyle: {
            textTransform: "uppercase",
          },
        }}
      />
      <AdminStack.Screen
        name="UsersDetails"
        component={MemberDetailsScreen}
        options={{
          title: "USER INFORMATION",
          headerTitleAlign: "center",
          headerTitleStyle: {
            textTransform: "uppercase",
          },
        }}
      />
      <AdminStack.Screen
        name="RegisterFaculty"
        component={RegisterFaculty}
        options={{
          title: "new faculty member",
          headerTitleAlign: "center",
          headerTitleStyle: {
            textTransform: "uppercase",
          },
        }}
      />
    </AdminStack.Navigator>
  );
}
