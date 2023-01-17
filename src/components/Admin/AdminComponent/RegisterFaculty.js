import { useContext, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import ConcellContext from "../../../context/Context";

export default function RegisterFaculty({ navigation }) {
  const {
    ActionType,
    isState,
    isRegisterError,
    isRegisterSuccess,
    setRegistererror,
    setRegisterSuccess,
  } = useContext(ConcellContext);
  const [Name, setName] = useState("");
  const [SchoolIDNumber, setSchoolIDNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [ShowPassword, setShowPassword] = useState(false);

  useLayoutEffect(() => {
    setRegistererror("");
    setRegisterSuccess("");
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          borderBottomWidth: 0.6,
          marginRight: 25,
          marginLeft: 25,
          marginTop: 13,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          value={Name}
          onChangeText={(text) => setName(text)}
          style={{
            paddingTop: 13,
            paddingBottom: 13,
            flex: 1,
            textTransform: "capitalize",
          }}
          cursorColor="black"
          placeholder="Your full name"
        />
        {Name.length !== 0 ? (
          <Pressable onPress={() => setName("")} style={{ marginLeft: 5 }}>
            <Ionicons name="ios-close-circle" size={15} color="#212121" />
          </Pressable>
        ) : undefined}
      </View>
      <View
        style={{
          borderBottomWidth: 0.6,
          marginRight: 25,
          marginLeft: 25,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          value={SchoolIDNumber}
          onChangeText={(text) => setSchoolIDNumber(text)}
          style={{
            paddingTop: 13,
            paddingBottom: 13,
            flex: 1,
          }}
          cursorColor="black"
          placeholder="School Number Ex. 1812xxxx"
          keyboardType="numeric"
        />
        {SchoolIDNumber.length !== 0 ? (
          <Pressable
            onPress={() => setSchoolIDNumber("")}
            style={{ marginLeft: 5 }}
          >
            <Ionicons name="ios-close-circle" size={15} color="#212121" />
          </Pressable>
        ) : undefined}
      </View>
      <View
        style={{
          borderBottomWidth: 0.6,
          marginRight: 25,
          marginLeft: 25,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          value={Password}
          onChangeText={(text) => setPassword(text)}
          style={{ paddingTop: 13, paddingBottom: 13, flex: 1 }}
          cursorColor="black"
          placeholder="Password"
          secureTextEntry={ShowPassword}
        />
        {Password.length !== 0 ? (
          <Pressable
            onPress={() => setShowPassword(!ShowPassword)}
            style={{ marginLeft: 5 }}
          >
            <Ionicons
              name={ShowPassword ? "md-eye-off" : "md-eye"}
              size={15}
              color="#212121"
            />
          </Pressable>
        ) : undefined}
      </View>
      {isRegisterError !== "" ? (
        <View style={{ paddingRight: 25, paddingLeft: 25, paddingTop: 5 }}>
          <Text
            style={{
              fontSize: 11,
              color: "#CD3130",
              textTransform: "capitalize",
            }}
          >
            *{isRegisterError}
          </Text>
        </View>
      ) : undefined}
      {isRegisterSuccess !== "" ? (
        <View style={{ paddingRight: 25, paddingLeft: 25, paddingTop: 5 }}>
          <Text
            style={{
              fontSize: 11,
              color: "#72D72D",
              textTransform: "capitalize",
            }}
          >
            {isRegisterSuccess}
          </Text>
        </View>
      ) : undefined}
      <View style={{ padding: 13 }}>
        <Pressable
          onPress={() =>
            ActionType.FETCH_REGISTER(
              SchoolIDNumber,
              Password,
              Name,
              "faculty",
              navigation
            )
          }
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
              Save
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
