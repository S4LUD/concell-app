import { useContext } from "react";
import { View, Text, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ConcellContext from "../../../context/Context";

export default function ManageAccount({ navigation }) {
  const { isState } = useContext(ConcellContext);

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
      <View
        style={{
          backgroundColor: "white",
          marginTop: 13,
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("MyEmail")}
          style={{
            height: 45,
            paddingLeft: 13,
            paddingRight: 13,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 14, color: "#333333" }}>Email</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, color: "#73777B" }}>
              {isState.user.email ? isState.user.email : "Email not set"}
            </Text>
            <Ionicons
              name="ios-chevron-forward-outline"
              size={16}
              color="#73777B"
            />
          </View>
        </Pressable>
        <View
          style={{
            borderBottomWidth: 0.6,
            borderBottomColor: "#EEF2F6",
          }}
        />
        <Pressable
          onPress={() => navigation.navigate("MyPassword")}
          style={{
            height: 45,
            paddingLeft: 13,
            paddingRight: 13,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 14, color: "#333333" }}>
            Change Password
          </Text>
          <Ionicons
            name="ios-chevron-forward-outline"
            size={16}
            color="#73777B"
          />
        </Pressable>
      </View>
    </View>
  );
}
