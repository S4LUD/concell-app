import { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ConcellContext from "../../../context/Context";

export default function MyName({ navigation }) {
  const { isState, JoinRoom, roomCodeError } = useContext(ConcellContext);
  const [roomCode, setRoomCode] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
      <View
        style={{
          backgroundColor: "white",
          height: 45,
          paddingLeft: 13,
          paddingRight: 13,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{ flex: 1, fontSize: 14 }}
          value={roomCode}
          onChangeText={(event) => setRoomCode(event)}
          cursorColor="#212121"
          selectionColor="#DDDDDD"
          keyboardType="default"
          placeholder="Enter room code"
        />
        {roomCode.length !== 0 ? (
          <Pressable onPress={() => setRoomCode("")} style={{ marginLeft: 5 }}>
            <Ionicons name="ios-close-circle" size={15} color="#212121" />
          </Pressable>
        ) : undefined}
      </View>
      {roomCodeError !== "" ? (
        <View
          style={{
            paddingLeft: 13,
            paddingRight: 13,
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontSize: 11,
              color: "#CD3130",
              textTransform: "capitalize",
            }}
          >
            {roomCodeError}
          </Text>
        </View>
      ) : undefined}
      <View style={{ padding: 13 }}>
        <Pressable
          onPress={() => JoinRoom(roomCode, navigation)}
          disabled={isState.loading}
          style={{
            backgroundColor: isState.loading ? "#B6B6B6" : "#212121",
            paddingLeft: 13,
            paddingRight: 13,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isState.loading ? (
            <ActivityIndicator color="#212121" size={28} />
          ) : (
            <Text style={{ fontSize: 14, fontWeight: "800", color: "white" }}>
              JOIN
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
