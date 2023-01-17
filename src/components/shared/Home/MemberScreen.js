import {
  View,
  Text,
  Image,
  FlatList,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { useContext, useState } from "react";
import ConcellContext from "../../../context/Context";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function Memberscreen({ navigation }) {
  const { isState, KickMember, LeaveRoom } = useContext(ConcellContext);
  const [isActive, setActive] = useState(false);
  const [SelectedMember, seSelectedMember] = useState({});
  const [roomMembers, setRoomMembers] = useState(
    isState.selectedRoomData.members
  );

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
          {roomMembers.length} member(s)
        </Text>
      </View>
    );
  };

  const KickModal = ({ item }) => {
    const confirmationAlert = () => {
      return Alert.alert(
        isState.position === "faculty" ? "Kick from room" : "Message",
        isState.position === "faculty"
          ? `Are you certain you want to kick ${item.name} out of the room?`
          : "Are you certain you want to leave?",
        [
          {
            text: "Cancel",
            onPress: () => {},
            style: "cancel",
          },
          {
            text: "OK",
            onPress: () => {
              isState.position === "faculty"
                ? KickMember(item._id, navigation)
                : LeaveRoom(item._id, item.name, navigation);
              setActive(!isActive);
            },
          },
        ]
      );
    };

    return (
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
                  color: "#FA3636",
                  fontSize: 14,
                  fontWeight: "800",
                  textTransform: "uppercase",
                }}
              >
                {isState.position === "faculty" ? "KICK" : "LEAVE"}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    );
  };

  const HandleKick = (item) => {
    seSelectedMember(item);
    setActive(!isActive);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F6F6F6",
      }}
    >
      <KickModal item={SelectedMember} />
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
            <Pressable
              onLongPress={() =>
                isState.position === "student" && isState.user._id === item._id
                  ? HandleKick(item)
                  : isState.position === "faculty"
                  ? HandleKick(item)
                  : undefined
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
                Empty Members
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
