import { View, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function CustomDetailsHeader({ navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate("Create_Schedule")}
        style={{
          backgroundColor: "#F1F2F4",
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 10,
          height: 35,
          width: 35,
        }}
      >
        <AntDesign name="plus" size={22} />
      </TouchableOpacity>
    </View>
  );
}
