import { useContext } from "react";
import { Text, View, Image, Pressable } from "react-native";
import ConcellContext from "../../../context/Context";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function SettingsScreen({ navigation }) {
  const { ActionType, isState } = useContext(ConcellContext);

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
      <Pressable
        onPress={() => navigation.navigate("Profile_Details")}
        style={{
          backgroundColor: "white",
          marginTop: 13,
          height: 45,
          paddingLeft: 13,
          paddingRight: 13,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {isState.user.image ? (
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                resizeMode: "contain",
              }}
              source={{ uri: `data:image/png;base64,${isState.user.image}` }}
            />
          ) : (
            <FontAwesome name="user-circle" size={30} color="#73777B" />
          )}
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                textTransform: "capitalize",
              }}
            >
              {isState.user.name}
            </Text>
          </View>
        </View>
        <Ionicons
          name="ios-chevron-forward-outline"
          size={16}
          color="#73777B"
        />
      </Pressable>
      <View style={{ marginTop: 13 }}>
        <Pressable
          onPress={() => navigation.navigate("ManageAccount")}
          style={{
            backgroundColor: "white",
            height: 45,
            paddingLeft: 13,
            paddingRight: 13,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#333333", fontSize: 14 }}>
            Manage My Account
          </Text>
          <Ionicons
            name="ios-chevron-forward-outline"
            size={16}
            color="#73777B"
          />
        </Pressable>
      </View>
      <Pressable
        onPress={() => ActionType.FETCH_LOGOUT()}
        style={{
          backgroundColor: "white",
          height: 45,
          paddingLeft: 13,
          paddingRight: 13,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 13,
        }}
      >
        <Text
          style={{
            color: "#CD3130",
            fontSize: 14,
            fontWeight: "800",
            textTransform: "uppercase",
          }}
        >
          sign out
        </Text>
      </Pressable>
    </View>
  );
}
