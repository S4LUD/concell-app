import { View, TouchableOpacity, Linking, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function useCustomHeader() {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: "#F1F2F4",
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          height: 35,
          width: 35,
        }}
        onPress={() => Linking.openURL("content://com.android.calendar/time/")}
      >
        <Ionicons name="ios-calendar-outline" size={22} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "#F1F2F4",
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
          marginLeft: 10,
          height: 35,
          width: 35,
        }}
      >
        <AntDesign name="plus" size={22} />
      </TouchableOpacity>
    </View>
  );
}
