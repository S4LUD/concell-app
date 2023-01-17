import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  Image,
  Platform,
  ActivityIndicator,
  Modal,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerAndroid from "@react-native-community/datetimepicker";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ConcellContext from "../../../context/Context";
import { format } from "date-fns";
import Constants from "expo-constants";

export default function CreateScheduleScreen({ navigation }) {
  const { isState, CreateSchedule, CreateScheduleError } =
    useContext(ConcellContext);
  const [isDefault, setDefault] = useState(new Date());
  const [From, setFrom] = useState("");
  const [To, setTo] = useState("");
  const [isDate, setDate] = useState("");
  const [isModeTo, setModeTo] = useState("");
  const [isMode, setMode] = useState("date");
  const [isShow, setShow] = useState(false);
  const [roomMembers, setRoomMembers] = useState(
    isState.selectedRoomData.members
  );
  const [isSelectAll, setSelectAll] = useState(false);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  let member_ids = [];
  const [Image1, setImage1] = useState("");
  const [Image2, setImage2] = useState("");
  const [Image3, setImage3] = useState("");
  const [ShowImage1, setShowImage1] = useState(false);
  const [ShowImage2, setShowImage2] = useState(false);
  const [ShowImage3, setShowImage3] = useState(false);

  const HandleUpdateChecked = (_id) => {
    if (isSelectAll) setSelectAll(!isSelectAll);

    let temp = roomMembers.map((item) => {
      if (_id === item._id) return { ...item, isChecked: !item.isChecked };
      return item;
    });

    setRoomMembers(temp);
  };

  const HandleSubmit = () => {
    roomMembers.forEach((item) => {
      if (item.isChecked) {
        return member_ids.push(item._id);
      }
    });

    CreateSchedule(
      Title,
      Description,
      From,
      To,
      isDate,
      member_ids,
      Image1,
      Image2,
      Image3,
      navigation
    );
  };

  const HandleSelectAll = () => {
    setSelectAll(!isSelectAll);
    let temp = roomMembers.map((item) => {
      if (!item.isChecked) {
        if (item.isChecked === false) return { ...item, isChecked: true };
        return { ...item, isChecked: true };
      }
      if (item.isChecked === isSelectAll) return { ...item, isChecked: false };
      return item;
    });
    setRoomMembers(temp);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || isDefault;
    setShow(Platform.OS === "ios");
    setDefault(currentDate);

    if (event.type === "dismissed") return;

    let tempDate = new Date(currentDate);

    if (isMode === "time" && isModeTo === "To") {
      setTo(tempDate);
      return setModeTo("");
    }
    if (isMode === "time") setFrom(tempDate);
    if (isMode === "date") setDate(tempDate);
  };

  const onShowDate = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const custom_list_header = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 45,
          paddingLeft: 13,
          paddingRight: 13,
        }}
      >
        <Text style={{ fontSize: 14 }}>{roomMembers.length} Member(s)</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ paddingRight: 10 }}>All</Text>
          <Pressable onPress={() => HandleSelectAll()}>
            <Ionicons
              name={`${isSelectAll ? "md-checkbox" : "md-checkbox-outline"}`}
              size={20}
              color={`${isSelectAll ? "#212121" : "#B6B6B6"}`}
            />
          </Pressable>
        </View>
      </View>
    );
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const HandleImage_1 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage1(result.assets[0].base64);
    }
  };

  const HandleImage_2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage2(result.assets[0].base64);
    }
  };

  const HandleImage_3 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage3(result.assets[0].base64);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={ShowImage1}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            alignItems: "center",
            paddingTop: Constants.statusBarHeight + 13,
            paddingBottom: 13,
          }}
        >
          <Image
            style={{ flex: 1, width: Dimensions.get("screen").width - 26 }}
            resizeMode="contain"
            source={{ uri: `data:image/png;base64,${Image1}` }}
          />
          <Pressable
            onPress={() => setShowImage1(!ShowImage1)}
            style={{
              backgroundColor: "white",
              marginTop: 13,
              padding: 5,
              width: 60,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                fontWeight: "800",
              }}
            >
              Close
            </Text>
          </Pressable>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={ShowImage2}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            alignItems: "center",
            paddingTop: Constants.statusBarHeight + 13,
            paddingBottom: 13,
          }}
        >
          <Image
            style={{ flex: 1, width: Dimensions.get("screen").width - 26 }}
            resizeMode="contain"
            source={{ uri: `data:image/png;base64,${Image2}` }}
          />
          <Pressable
            onPress={() => setShowImage2(!ShowImage2)}
            style={{
              backgroundColor: "white",
              marginTop: 13,
              padding: 5,
              width: 60,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                fontWeight: "800",
              }}
            >
              Close
            </Text>
          </Pressable>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={ShowImage3}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            alignItems: "center",
            paddingTop: Constants.statusBarHeight + 13,
            paddingBottom: 13,
          }}
        >
          <Image
            style={{ flex: 1, width: Dimensions.get("screen").width - 26 }}
            resizeMode="contain"
            source={{ uri: `data:image/png;base64,${Image3}` }}
          />
          <Pressable
            onPress={() => setShowImage3(!ShowImage3)}
            style={{
              backgroundColor: "white",
              marginTop: 13,
              padding: 5,
              width: 60,
              borderRadius: 5,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 12,
                textTransform: "uppercase",
                fontWeight: "800",
              }}
            >
              Close
            </Text>
          </Pressable>
        </View>
      </Modal>
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
          value={Title}
          onChangeText={(event) => setTitle(event)}
          style={{
            flex: 1,
            fontSize: 14,
          }}
          cursorColor="#212121"
          selectionColor="#DDDDDD"
          keyboardType="default"
          placeholder="Schedule Title Ex. Evaluation."
        />
        {Title.length !== 0 ? (
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
          value={Description}
          onChangeText={(event) => setDescription(event)}
          style={{
            flex: 1,
            textAlignVertical: "top",
            fontSize: 14,
          }}
          cursorColor="#212121"
          selectionColor="#DDDDDD"
          keyboardType="default"
          placeholder="Description Ex. Evaluation happening now."
          multiline={true}
          numberOfLines={3}
        />
        {Description.length !== 0 ? (
          <Pressable
            onPress={() => setDescription("")}
            style={{ marginLeft: 5 }}
          >
            <Ionicons name="ios-close-circle" size={15} color="#212121" />
          </Pressable>
        ) : undefined}
      </View>
      <View style={{ flexDirection: "row", padding: 13 }}>
        <Pressable
          onPress={() => HandleImage_1()}
          onLongPress={() => Image1 && setShowImage1(!ShowImage1)}
          style={{
            backgroundColor: "white",
            height: 70,
            width: 70,
            borderRadius: 10,
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#EEF2F6",
          }}
        >
          {Image1 ? (
            <>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 10,
                  resizeMode: "cover",
                }}
                source={{ uri: `data:image/png;base64,${Image1}` }}
              />
              <Pressable
                onPress={() => setImage1("")}
                style={{
                  position: "absolute",
                  top: 3,
                  right: 3,
                  backgroundColor: "white",
                  borderRadius: 5,
                }}
              >
                <Ionicons name="ios-close-outline" size={16} color="red" />
              </Pressable>
            </>
          ) : (
            <>
              <Ionicons name="ios-add-outline" size={30} color="#D9D9D9" />
              <Text
                style={{
                  fontSize: 10,
                  color: "#D9D9D9",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                Upload Image
              </Text>
            </>
          )}
        </Pressable>
        <Pressable
          onPress={() => HandleImage_2()}
          onLongPress={() => Image2 && setShowImage2(!ShowImage2)}
          style={{
            backgroundColor: "white",
            height: 70,
            width: 70,
            borderRadius: 10,
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#EEF2F6",
          }}
        >
          {Image2 ? (
            <>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 10,
                  resizeMode: "cover",
                }}
                source={{ uri: `data:image/png;base64,${Image2}` }}
              />
              <Pressable
                onPress={() => setImage2("")}
                style={{
                  position: "absolute",
                  top: 3,
                  right: 3,
                  backgroundColor: "white",
                  borderRadius: 5,
                }}
              >
                <Ionicons name="ios-close-outline" size={16} color="red" />
              </Pressable>
            </>
          ) : (
            <>
              <Ionicons name="ios-add-outline" size={30} color="#D9D9D9" />
              <Text
                style={{
                  fontSize: 10,
                  color: "#D9D9D9",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                Upload Image
              </Text>
            </>
          )}
        </Pressable>
        <Pressable
          onPress={() => HandleImage_3()}
          onLongPress={() => Image3 && setShowImage3(!ShowImage3)}
          style={{
            backgroundColor: "white",
            height: 70,
            width: 70,
            borderRadius: 10,
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: "#EEF2F6",
          }}
        >
          {Image3 ? (
            <>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 10,
                  resizeMode: "cover",
                }}
                source={{ uri: `data:image/png;base64,${Image3}` }}
              />
              <Pressable
                onPress={() => setImage3("")}
                style={{
                  position: "absolute",
                  top: 3,
                  right: 3,
                  backgroundColor: "white",
                  borderRadius: 5,
                }}
              >
                <Ionicons name="ios-close-outline" size={16} color="red" />
              </Pressable>
            </>
          ) : (
            <>
              <Ionicons name="ios-add-outline" size={30} color="#D9D9D9" />
              <Text
                style={{
                  fontSize: 10,
                  color: "#D9D9D9",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                Upload Image
              </Text>
            </>
          )}
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            paddingLeft: 13,
            paddingRight: 13,
            height: 45,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            Date & Time
          </Text>
        </View>
        <Pressable
          onPress={() => onShowDate("time")}
          style={{
            paddingLeft: 13,
            paddingRight: 13,
            height: 45,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 5,
            }}
          >
            <Text>From</Text>
            <Text style={{ color: From ? "black" : "#73777B" }}>
              {From ? format(From, "hh:mm bb") : "Not set"}
            </Text>
          </View>
          <Ionicons
            name="ios-chevron-forward-outline"
            size={16}
            color="#73777B"
          />
        </Pressable>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#EEF2F6",
          }}
        />
        <Pressable
          onPress={() => {
            setModeTo("To");
            onShowDate("time");
          }}
          style={{
            paddingLeft: 13,
            paddingRight: 13,
            height: 45,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 5,
            }}
          >
            <Text>To</Text>
            <Text style={{ color: To ? "black" : "#73777B" }}>
              {To ? format(To, "hh:mm bb") : "Not set"}
            </Text>
          </View>
          <Ionicons
            name="ios-chevron-forward-outline"
            size={16}
            color="#73777B"
          />
        </Pressable>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#EEF2F6",
          }}
        />
        <Pressable
          onPress={() => onShowDate("date")}
          style={{
            paddingLeft: 13,
            paddingRight: 13,
            height: 45,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 5,
            }}
          >
            <Text>Date</Text>
            <Text style={{ color: isDate ? "black" : "#73777B" }}>
              {isDate ? format(isDate, "dd/MM/yyyy") : "Not set"}
            </Text>
          </View>
          <Ionicons
            name="ios-chevron-forward-outline"
            size={16}
            color="#73777B"
          />
        </Pressable>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={roomMembers}
          ItemSeparatorComponent={() => (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#EEF2F6",
              }}
            />
          )}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white",
                  height: 45,
                  paddingLeft: 13,
                  paddingRight: 13,
                }}
              >
                {item.image ? (
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 100,
                      resizeMode: "contain",
                    }}
                    source={{ uri: `data:image/png;base64,${item.image}` }}
                  />
                ) : (
                  <FontAwesome name="user-circle" size={30} color="#73777B" />
                )}
                <View
                  style={{
                    flex: 1,
                    marginLeft: 13,
                    marginRight: 13,
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      fontSize: 14,
                      color: "#333333",
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
                <Pressable onPress={() => HandleUpdateChecked(item._id)}>
                  <Ionicons
                    name={`${
                      item.isChecked ? "md-checkbox" : "md-checkbox-outline"
                    }`}
                    size={20}
                    color={`${item.isChecked ? "#212121" : "#B6B6B6"}`}
                  />
                </Pressable>
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={custom_list_header}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  backgroundColor: "white",
                  height: 45,
                  paddingLeft: 13,
                  paddingRight: 13,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 14, color: "#73777B" }}>
                  Empty Members
                </Text>
              </View>
            );
          }}
        />
      </View>
      {CreateScheduleError !== "" && (
        <View
          style={{
            paddingLeft: 13,
            paddingRight: 13,

            backgroundColor: "#CD3130",
          }}
        >
          <Text
            style={{
              fontSize: 11,
              color: "white",
            }}
          >
            {CreateScheduleError}
          </Text>
        </View>
      )}
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
            <ActivityIndicator color="#212121" size={28} />
          ) : (
            <Text style={{ fontSize: 14, fontWeight: "800", color: "white" }}>
              Save
            </Text>
          )}
        </Pressable>
      </View>
      {isShow && (
        <DateTimePickerAndroid
          value={isDefault}
          mode={isMode}
          display="default"
          minimumDate={new Date()}
          onChange={onDateChange}
        />
      )}
    </View>
  );
}
