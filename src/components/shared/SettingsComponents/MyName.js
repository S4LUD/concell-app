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
  const { isState, updateName } = useContext(ConcellContext);
  let tempDefault = isState.user.name;
  const [isName, setName] = useState(tempDefault);

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
          style={{ flex: 1, fontSize: 14, textTransform: "capitalize" }}
          value={isName}
          onChangeText={(event) => setName(event)}
          cursorColor="#212121"
          selectionColor="#DDDDDD"
          keyboardType="default"
        />
        {isName.length !== 0 ? (
          <Pressable onPress={() => setName("")} style={{ marginLeft: 5 }}>
            <Ionicons name="ios-close-circle" size={15} color="#212121" />
          </Pressable>
        ) : undefined}
      </View>
      <View style={{ padding: 13 }}>
        <Pressable
          onPress={() => updateName(isName, navigation)}
          disabled={tempDefault === isName || isName === "" || isState.loading}
          style={{
            backgroundColor:
              tempDefault === isName || isName === "" || isState.loading
                ? "#B6B6B6"
                : "#212121",
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
              Save
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
