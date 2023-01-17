import { Text, View, FlatList } from "react-native";
import { useContext, useLayoutEffect } from "react";
import ConcellContext from "../../../context/Context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { formatDistanceToNow } from "date-fns";

export default function NotificationScreen() {
  const { GetNotifications, isState } = useContext(ConcellContext);

  useLayoutEffect(() => {
    GetNotifications();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
      <FlatList
        onRefresh={() => GetNotifications()}
        refreshing={isState.loading}
        showsVerticalScrollIndicator={false}
        data={isState.notifications}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomWidth: 0.6,
              borderBottomColor: "#EEF2F6",
            }}
          />
        )}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                padding: 13,
                flexDirection: "row",
                backgroundColor: "white",
              }}
            >
              <View
                style={{
                  marginRight: 13,
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name="ios-notifications-outline"
                  size={20}
                  color="#73777B"
                />
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    fontSize: 14,
                    paddingRight: 13,
                    color: "#333333",
                    textTransform: "capitalize",
                  }}
                >
                  {item.message}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#73777B",
                    }}
                  >
                    {formatDistanceToNow(new Date(item.createdAt))}
                  </Text>
                </View>
              </View>
            </View>
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
                color: "#333333",
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: "600" }}>Recent</Text>
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
                Empty Notifications
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
