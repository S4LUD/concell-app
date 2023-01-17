import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Clipboard from "expo-clipboard";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useContext, useLayoutEffect } from "react";
import ConcellContext from "../../../context/Context";
import { format } from "date-fns";

export default function RoomDetailsScreen({ navigation, route }) {
  const { item } = route.params;
  const { ActionType, isState } = useContext(ConcellContext);

  useLayoutEffect(() => {
    ActionType.FETCH_SELECTED_ROOM_DATA(item);
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(item.code);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F6F6F6",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 13,
          paddingRight: 13,
          paddingTop: 13,
          backgroundColor: "white",
          marginTop: 13,
        }}
      >
        <View style={{ marginRight: 13 }}>
          <View
            style={{
              width: 30,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="meeting-room" size={30} />
          </View>
        </View>
        <View
          style={{
            height: 45,
            marginLeft: 5,
            alignItems: "flex-start",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#333333",
              fontWeight: "500",
            }}
          >
            {item.room_name}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#73777B",
            }}
          >
            Created on 11/30/2022
          </Text>
        </View>
        {isState.position === "faculty" && (
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity
              onPress={() => copyToClipboard()}
              style={{
                padding: 5,
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
                width: 100,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Ionicons
                  name="ios-clipboard-outline"
                  size={14}
                  color="#727272"
                />
                <Text style={{ fontSize: 14, color: "#727272" }}>Code</Text>
              </View>
              <Text style={{ fontSize: 16, fontWeight: "600" }}>
                {item.code}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View
        style={{
          padding: 13,
          backgroundColor: "white",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#333333",
          }}
        >
          {item.room_details}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={item.schedules}
          renderItem={({ item }) => {
            if (
              item.members[0]?._id === isState.user._id &&
              isState.position === "student"
            ) {
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate("ScheduleDetails", {
                      item: item,
                    })
                  }
                  style={{
                    flexDirection: "row",
                    height: 45,
                    paddingLeft: 13,
                    paddingRight: 13,
                    alignItems: "center",
                    backgroundColor: "white",
                  }}
                >
                  <View
                    style={{
                      marginRight: 13,
                    }}
                  >
                    <EvilIcons name="exclamation" size={25} color="#73777B" />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: "column",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#333333",
                        textTransform: "capitalize",
                      }}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#73777B",
                        }}
                      >
                        {`${format(
                          new Date(item.From),
                          "hh:mm aa"
                        )} To ${format(new Date(item.To), "hh:mm aa")}`}
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          color: "#73777B",
                        }}
                      >
                        {format(new Date(item.Date), "MM/dd/yyyy")}
                      </Text>
                    </View>
                  </View>
                  <View style={{ paddingLeft: 13 }}>
                    <Ionicons
                      name="ios-chevron-forward-outline"
                      size={16}
                      color="#73777B"
                    />
                  </View>
                </Pressable>
              );
            }
            return (
              <Pressable
                onPress={() =>
                  navigation.navigate("ScheduleDetails", {
                    item: item,
                  })
                }
                style={{
                  flexDirection: "row",
                  height: 45,
                  paddingLeft: 13,
                  paddingRight: 13,
                  alignItems: "center",
                  backgroundColor: "white",
                }}
              >
                <View
                  style={{
                    marginRight: 13,
                  }}
                >
                  <EvilIcons name="exclamation" size={25} color="#73777B" />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "column",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "#333333",
                      textTransform: "capitalize",
                    }}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#73777B",
                      }}
                    >
                      {`${format(new Date(item.From), "hh:mm aa")} To ${format(
                        new Date(item.To),
                        "hh:mm aa"
                      )}`}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#73777B",
                      }}
                    >
                      {format(new Date(item.Date), "MM/dd/yyyy")}
                    </Text>
                  </View>
                </View>
                <View style={{ paddingLeft: 13 }}>
                  <Ionicons
                    name="ios-chevron-forward-outline"
                    size={16}
                    color="#73777B"
                  />
                </View>
              </Pressable>
            );
          }}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  height: 45,
                  paddingLeft: 13,
                  paddingRight: 13,
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontSize: 14, fontWeight: "600" }}>
                  Room Schedule(s)
                </Text>
              </View>
            );
          }}
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
                  Empty Schedule
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
