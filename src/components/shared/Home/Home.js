import React, { useContext, useLayoutEffect } from "react";
import { View, FlatList, Text } from "react-native";
import ConcellContext from "../../../context/Context";
import Room from "./Room";

export default function HomeScreen({ navigation }) {
  const { GetRooms, isState } = useContext(ConcellContext);

  const custom_list_header = () => {
    return (
      <View
        style={{
          paddingTop: 13,
        }}
      />
    );
  };

  useLayoutEffect(() => {
    GetRooms();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F6F6F6",
      }}
    >
      <FlatList
        onRefresh={() => GetRooms()}
        refreshing={isState.loading}
        showsVerticalScrollIndicator={false}
        data={isState.room}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#EEF2F6",
            }}
          />
        )}
        renderItem={({ item }) => <Room item={item} navigation={navigation} />}
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
                Empty Rooms
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
