import { View, Text, Pressable } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Room({ item, navigation }) {
  return (
    <Pressable
      style={{
        padding: 13,
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
      }}
      onPress={() =>
        navigation.navigate("Room_Details", {
          item: item,
        })
      }
    >
      <View style={{ marginRight: 13 }}>
        <View
          style={{
            width: 35,
            height: 35,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons name="meeting-room" size={25} color="#000000" />
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}
      >
        <View>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              textTransform: "capitalize",
              color: "#000000",
            }}
            numberOfLines={1}
          >
            {item.room_name}
          </Text>
        </View>
        <View>
          <Text
            style={{
              flex: 1,
              fontSize: 14,
              color: "#000000",
            }}
            numberOfLines={4}
          >
            {item.room_details}
          </Text>
        </View>
      </View>
      <View
        style={{
          paddingLeft: 13,
          justifyContent: "center",
        }}
      >
        <Ionicons
          name="ios-chevron-forward-outline"
          size={16}
          color="#000000"
        />
      </View>
    </Pressable>
  );
}
