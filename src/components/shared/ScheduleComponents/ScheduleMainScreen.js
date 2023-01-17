import React, { useContext, useLayoutEffect } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import ConcellContext from "../../../context/Context";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { formatDistanceToNow } from "date-fns";

export default function ScheduleMainScreen({ navigation }) {
  const { MySchedules, isState } = useContext(ConcellContext);

  const custom_list_header = () => {
    return (
      <View
        style={{
          height: 45,
          paddingLeft: 13,
          paddingRight: 13,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 14, fontWeight: "600", color: "#333333" }}>
          Recent
        </Text>
      </View>
    );
  };

  useLayoutEffect(() => {
    MySchedules();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
      <FlatList
        onRefresh={() => MySchedules()}
        refreshing={isState.loading}
        showsVerticalScrollIndicator={false}
        data={isState.schedules}
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
            <Pressable
              onPress={() =>
                navigation.navigate("Schedule_Container", {
                  item: item,
                })
              }
              style={{
                height: 45,
                paddingLeft: 13,
                paddingRight: 13,
                flexDirection: "row",
                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  marginRight: 13,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EvilIcons name="exclamation" size={25} color="#73777B" />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "center",
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
                    {formatDistanceToNow(new Date(item.createdAt))}
                  </Text>
                  <Text
                    style={{
                      fontSize: 11,
                      color: "#73777B",
                    }}
                  ></Text>
                </View>
              </View>
              <View style={{ paddingLeft: 13, justifyContent: "center" }}>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={20}
                  color="#73777B"
                />
              </View>
            </Pressable>
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
                Empty Schedules
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
