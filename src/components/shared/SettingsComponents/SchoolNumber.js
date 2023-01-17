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

export default function SchoolNumber({ navigation }) {
  const { isState, updateSIN, isSINError } = useContext(ConcellContext);
  let tempDefault = isState.user.school_identification_number.toString();
  const [isSchoolNumber, setSchoolNumber] = useState(tempDefault);

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
          value={isSchoolNumber}
          onChangeText={(event) => setSchoolNumber(event)}
          cursorColor="#212121"
          selectionColor="#DDDDDD"
          keyboardType="numeric"
        />
        {isSchoolNumber.length !== 0 ? (
          <Pressable
            onPress={() => setSchoolNumber("")}
            style={{ marginLeft: 5 }}
          >
            <Ionicons name="ios-close-circle" size={15} color="#212121" />
          </Pressable>
        ) : undefined}
      </View>
      {isSINError !== "" ? (
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
            {isSINError}
          </Text>
        </View>
      ) : undefined}
      <View style={{ padding: 13 }}>
        <Pressable
          onPress={() => updateSIN(isSchoolNumber, navigation)}
          disabled={
            tempDefault === isSchoolNumber ||
            isSchoolNumber === "" ||
            isState.loading
          }
          style={{
            backgroundColor:
              tempDefault === isSchoolNumber ||
              isSchoolNumber === "" ||
              isState.loading
                ? "#B6B6B6"
                : "#212121",
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
