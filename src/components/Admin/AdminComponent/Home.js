import { useContext, useLayoutEffect } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import ConcellContext from "../../../context/Context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeScreen({ navigation }) {
  const { ActionType, isState, RefreshUser } = useContext(ConcellContext);

  useLayoutEffect(() => RefreshUser(), []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <FlatList
        refreshing={isState.loading}
        onRefresh={() => RefreshUser()}
        ListHeaderComponent={() => {
          return (
            <>
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 150,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#FD8A8A",
                      height: 100,
                      width: 150,
                      borderRadius: 10,
                      padding: 13,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: "800",
                        color: "white",
                      }}
                    >
                      {isState.faculty.length ? isState.faculty.length : 0}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "500",
                        color: "white",
                        textTransform: "uppercase",
                      }}
                    >
                      Total faculty user
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: 150,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#9EA1D4",
                      height: 100,
                      width: 150,
                      borderRadius: 10,
                      padding: 13,
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: "800",
                        color: "white",
                      }}
                    >
                      {isState.student.length ? isState.student.length : 0}
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: "500",
                        color: "white",
                        textTransform: "uppercase",
                      }}
                    >
                      Total student user
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <View style={{ flexDirection: "column" }}>
                  <Pressable
                    onPress={() => navigation.navigate("RegisterFaculty")}
                    style={{
                      backgroundColor: "white",
                      marginTop: 10,
                      height: 45,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: 13,
                      paddingRight: 13,
                      borderTopWidth: 0.6,
                      borderBottomWidth: 0.6,
                      borderBottomColor: "#F7F7F7",
                      borderTopColor: "#F7F7F7",
                    }}
                  >
                    <Text style={{ fontSize: 14, fontWeight: "500" }}>
                      Register Faculty User
                    </Text>
                    <Ionicons name="ios-chevron-forward-outline" size={16} />
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("Users", {
                        position: "faculty",
                      })
                    }
                    style={{
                      backgroundColor: "white",
                      marginTop: 10,
                      height: 45,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: 13,
                      paddingRight: 13,
                      borderTopWidth: 0.6,
                      borderBottomWidth: 0.6,
                      borderBottomColor: "#F7F7F7",
                      borderTopColor: "#F7F7F7",
                    }}
                  >
                    <Text style={{ fontSize: 14, fontWeight: "500" }}>
                      View Faculty User
                    </Text>
                    <Ionicons name="ios-chevron-forward-outline" size={16} />
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      navigation.navigate("Users", {
                        position: "student",
                      })
                    }
                    style={{
                      backgroundColor: "white",
                      marginTop: 10,
                      height: 45,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignItems: "center",
                      paddingLeft: 13,
                      paddingRight: 13,
                      borderTopWidth: 0.6,
                      borderBottomWidth: 0.6,
                      borderBottomColor: "#F7F7F7",
                      borderTopColor: "#F7F7F7",
                    }}
                  >
                    <Text style={{ fontSize: 14, fontWeight: "500" }}>
                      View Student User
                    </Text>
                    <Ionicons name="ios-chevron-forward-outline" size={16} />
                  </Pressable>
                </View>
              </View>
            </>
          );
        }}
      />

      <Pressable
        onPress={() => ActionType.FETCH_LOGOUT()}
        style={{
          backgroundColor: "#212121",
          height: 45,
          paddingLeft: 13,
          paddingRight: 13,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: "#FA3636",
            fontSize: 14,
            fontWeight: "800",
            textTransform: "uppercase",
          }}
        >
          sign out
        </Text>
      </Pressable>
    </View>
  );
}
