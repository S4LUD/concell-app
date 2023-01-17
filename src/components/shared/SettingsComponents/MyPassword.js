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

export default function MyPassword() {
  const {
    isState,
    updatePassword,
    isPasswordError,
    setPasswordError,
    isSuccess,
  } = useContext(ConcellContext);
  const [isOP, setOP] = useState(true);
  const [isNP, setNP] = useState(true);
  const [isCP, setCP] = useState(true);
  const [isOld, setOld] = useState("");
  const [isNew, setNew] = useState("");
  const [isConfirm, setConfirm] = useState("");

  const HandleOP = () => {
    setOP(!isOP);
  };
  const HandleNP = () => {
    setNP(!isNP);
  };
  const HandleCP = () => {
    setCP(!isCP);
  };

  const HandleSubmit = () => {
    if (isOld === "") {
      return setPasswordError("Please correctly enter your previous password");
    } else if (isNew !== isConfirm) {
      return setPasswordError("Please correctly enter your new password");
    } else {
      setPasswordError("");
    }
    updatePassword(isOld, isNew);
    setOld("");
    setNew("");
    setConfirm("");
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
          value={isOld}
          onChangeText={(text) => setOld(text)}
          style={{ flex: 1, fontSize: 14 }}
          cursorColor="#212121"
          selectionColor="#DDDDDD"
          placeholder="Old Password"
          secureTextEntry={isOP}
        />
        <Pressable onPress={() => HandleOP()} style={{ marginLeft: 5 }}>
          <Ionicons
            name={isOP ? "md-eye-off" : "md-eye"}
            size={15}
            color="#212121"
          />
        </Pressable>
      </View>
      <View
        style={{
          borderBottomWidth: 0.6,
          borderBottomColor: "#EEF2F6",
        }}
      />
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
          value={isNew}
          onChangeText={(text) => setNew(text)}
          style={{ flex: 1, fontSize: 14 }}
          cursorColor="#212121"
          selectionColor="#DDDDDD"
          placeholder="New Password"
          secureTextEntry={isNP}
        />
        <Pressable onPress={() => HandleNP()} style={{ marginLeft: 5 }}>
          <Ionicons
            name={isNP ? "md-eye-off" : "md-eye"}
            size={15}
            color="#212121"
          />
        </Pressable>
      </View>
      <View
        style={{
          borderBottomWidth: 0.6,
          borderBottomColor: "#EEF2F6",
        }}
      />
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
          value={isConfirm}
          onChangeText={(text) => setConfirm(text)}
          style={{ flex: 1, fontSize: 14 }}
          cursorColor="#212121"
          selectionColor="#DDDDDD"
          placeholder="Confirm Password"
          secureTextEntry={isCP}
        />
        <Pressable onPress={() => HandleCP()} style={{ marginLeft: 5 }}>
          <Ionicons
            name={isCP ? "md-eye-off" : "md-eye"}
            size={15}
            color="#212121"
          />
        </Pressable>
      </View>
      {isPasswordError.length !== 0 ? (
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
            {isPasswordError}
          </Text>
        </View>
      ) : undefined}
      {isSuccess && (
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
              color: "#72D72D",
              textTransform: "capitalize",
            }}
          >
            Your password has been successfully changed.
          </Text>
        </View>
      )}
      <View style={{ padding: 13 }}>
        <Pressable
          disabled={isState.loading}
          onPress={() => HandleSubmit()}
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
