import { useContext, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ConcellContext from "../../../context/Context";

export default function CreateRoom({ navigation }) {
  const { createRoom, isRoomError, isState } = useContext(ConcellContext);
  const [isDescription, setDescription] = useState("");
  const [isTitle, setTitle] = useState("");

  const HandleSubmit = () => {
    createRoom(isTitle, isDescription, navigation);
    setDescription("");
    setTitle("");
  };

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
          value={isTitle}
          onChangeText={(event) => setTitle(event)}
          cursorColor="#212121"
          selectionColor="#DDDDDD"
          keyboardType="default"
          placeholder="Room Title Ex. Evaluation."
        />
        {isTitle.length !== 0 ? (
          <Pressable onPress={() => setTitle("")} style={{ marginLeft: 5 }}>
            <Ionicons name="ios-close-circle" size={15} color="#212121" />
          </Pressable>
        ) : undefined}
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "#EEF2F6",
        }}
      />
      <View
        style={{
          backgroundColor: "white",
          padding: 13,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            flex: 1,
            textAlignVertical: "top",
            fontSize: 14,
          }}
          value={isDescription}
          onChangeText={(event) => setDescription(event)}
          cursorColor="#212121"
          selectionColor="#DDDDDD"
          keyboardType="default"
          placeholder="Description Ex. Evaluation happening now."
          multiline={true}
          numberOfLines={5}
        />
        {isDescription.length !== 0 ? (
          <Pressable
            onPress={() => setDescription("")}
            style={{ marginLeft: 5 }}
          >
            <Ionicons name="ios-close-circle" size={15} color="#212121" />
          </Pressable>
        ) : undefined}
      </View>
      {isRoomError.length !== 0 ? (
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
            {isRoomError}
          </Text>
        </View>
      ) : undefined}
      <View style={{ padding: 13 }}>
        <Pressable
          onPress={() => HandleSubmit()}
          disabled={isState.loading}
          style={{
            backgroundColor: isState.loading ? "#B6B6B6" : "#212121",
            paddingLeft: 13,
            paddingRight: 13,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isState.loading ? (
            <ActivityIndicator color="##212121" size={28} />
          ) : (
            <Text style={{ fontSize: 14, fontWeight: "800", color: "white" }}>
              Save
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
