import {
  View,
  Text,
  Image,
  FlatList,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { useContext, useState, useLayoutEffect } from "react";
import ConcellContext from "../../../context/Context";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Memberscreen({ navigation, route }) {
  const { position } = route.params;
  const { isState, GetUserByPosition } = useContext(ConcellContext);
  const [isActive, setActive] = useState(false);

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
        <Text style={{ fontSize: 14, fontWeight: "600" }}>
          {`${
            isState[position].length ? isState[position].length : 0
          } member(s)`}
        </Text>
      </View>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: position + " members" });
    GetUserByPosition(position);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F6F6F6",
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={isState[position]}
        ItemSeparatorComponent={() => (
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "#EEF2F6",
            }}
          />
        )}
        renderItem={({ item }) => {
          const confirmationAlert = () => {
            return Alert.alert(
              "Remove from room",
              "Are you certain you want to kick this person out of the room?",
              [
                {
                  text: "Cancel",
                  onPress: () => {},
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: () => {
                    setActive(!isActive);
                  },
                },
              ]
            );
          };

          return (
            <>
              <Modal
                animationType="fade"
                transparent={true}
                visible={isActive}
                onRequestClose={() => {
                  setActive(!isActive);
                }}
                statusBarTranslucent={true}
                presentationStyle="overFullScreen"
              >
                <Pressable
                  onPress={() => setActive(!isActive)}
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "white",
                      padding: 10,
                      width: "100%",
                    }}
                  >
                    <Pressable
                      onPress={() => confirmationAlert()}
                      style={{
                        backgroundColor: "#212121",
                        paddingLeft: 13,
                        paddingRight: 13,
                        height: 40,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: "800",
                          color: "#CD3130",
                        }}
                      >
                        REMOVE
                      </Text>
                    </Pressable>
                  </View>
                </Pressable>
              </Modal>
              <Pressable
                onLongPress={() => setActive(!isActive)}
                onPress={() =>
                  navigation.navigate("UsersDetails", { item: item })
                }
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flex: 1,
                  height: 45,
                  paddingLeft: 13,
                  paddingRight: 13,
                  backgroundColor: "white",
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
                    marginLeft: 13,
                    flex: 1,
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
                {/* <View style={{ paddingLeft: 13, justifyContent: "center" }}>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={20}
                color="#73777B"
              />
            </View> */}
              </Pressable>
            </>
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
              <Text
                style={{
                  fontSize: 14,
                  color: "#73777B",
                  textTransform: "capitalize",
                }}
              >
                {`Empty ${position} member`}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
