import {
  View,
  Text,
  Pressable,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useContext, useState } from "react";
import ConcellContext from "../../../context/Context";

export default function RoomComments({ navigation }) {
  const { isState, Comment } = useContext(ConcellContext);
  const [isComment, setComment] = useState("");

  const HandleSubmit = () => {
    Comment(isComment, navigation);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
      <View style={{ flex: 1, paddingLeft: 13, paddingRight: 13 }}>
        <FlatList
          data={isState.selectedSchedule.comments}
          renderItem={({ item }) => {
            if (item._id === isState.user._id)
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      paddingLeft: 13,
                      paddingRight: 13,
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderRadius: 20,
                      justifyContent: "center",
                      maxWidth: 270,
                    }}
                  >
                    <Text style={{ color: "#000000", fontSize: 16 }}>
                      {item.comment}
                    </Text>
                  </View>
                </View>
              );
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                {item.image ? (
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 100,
                      resizeMode: "contain",
                      marginRight: 10,
                    }}
                    source={{ uri: `data:image/png;base64,${item.image}` }}
                  />
                ) : (
                  <View style={{ marginRight: 10 }}>
                    <FontAwesome name="user-circle" size={30} color="#000000" />
                  </View>
                )}
                <View>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: "500",
                      paddingBottom: 5,
                      color: "#828282",
                    }}
                  >
                    {item.name}
                  </Text>
                  <View
                    style={{
                      backgroundColor: "#FFFFFF",
                      paddingLeft: 13,
                      paddingRight: 13,
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderRadius: 20,
                      justifyContent: "center",
                      maxWidth: 270,
                    }}
                  >
                    <Text style={{ color: "#000000", fontSize: 16 }}>
                      {item.comment}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
          ItemSeparatorComponent={() => {
            return <View style={{ paddingBottom: 13 }} />;
          }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => {
            return <View style={{ paddingBottom: 10 }} />;
          }}
          ListHeaderComponent={() => {
            return <View style={{ paddingBottom: 13 }} />;
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#73777B",
                    textTransform: "uppercase",
                  }}
                >
                  No Comments yet
                </Text>
              </View>
            );
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          paddingLeft: 13,
          paddingRight: 13,
          paddingTop: 10,
          paddingBottom: 10,
          maxHeight: 100,
        }}
      >
        <TextInput
          value={isComment}
          onChangeText={(text) => setComment(text)}
          cursorColor="#000000"
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 13,
            paddingRight: 13,
            color: "#000000",
            fontSize: 16,
          }}
          placeholder="Comment"
          multiline={true}
          rows={0}
          placeholderTextColor="#828282"
        />
        <Pressable
          onPress={() => HandleSubmit()}
          disabled={isState.loading || isComment === ""}
          style={{
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 13,
            justifyContent: "flex-end",
          }}
        >
          <Ionicons
            name="ios-send"
            size={20}
            color={isState.loading || isComment === "" ? "#B6B6B6" : "#000000"}
          />
        </Pressable>
      </View>
    </View>
  );
}
