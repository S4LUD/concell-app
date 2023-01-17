import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import { format } from "date-fns";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Constants from "expo-constants";
import { useContext, useEffect, useState } from "react";
import ConcellContext from "../../../context/Context";

export default function ScheduleDetails({ navigation, route }) {
  const { item } = route.params;
  const [PreviewImage, setPreviewImage] = useState(false);
  const [SelectedImage, setSetSelectedImage] = useState(false);
  const { ActionType } = useContext(ConcellContext);

  useEffect(() => {
    ActionType.FETCH_SELECTED_SCHEDULE(item);
  }, []);

  const ViewModal = ({ SelectedImage }) => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        visible={PreviewImage}
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
            style={{
              flex: 1,
              width: Dimensions.get("screen").width - 26,
            }}
            resizeMode="contain"
            source={{ uri: `data:image/png;base64,${SelectedImage}` }}
          />
          <Pressable
            onPress={() => setPreviewImage(!PreviewImage)}
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
    );
  };

  const HandlePreview = (item) => {
    setSetSelectedImage(item);
    setPreviewImage(!PreviewImage);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
      <View
        style={{
          padding: 13,
          backgroundColor: "white",
          marginTop: 13,
        }}
      >
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              color: "#333333",
              textTransform: "capitalize",
            }}
          >
            {item.title}
          </Text>
          <Text style={{ fontSize: 11, color: "#73777B" }}>
            {format(new Date(item.createdAt), "MM/dd/yyyy")}
          </Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, marginTop: 13, color: "#333333" }}>
            {item.description}
          </Text>
        </View>
      </View>

      <ViewModal SelectedImage={SelectedImage} />

      <FlatList
        style={{
          paddingTop: 13,
          paddingLeft: 13,
          paddingRight: 13,
          maxHeight: 85,
        }}
        horizontal={true}
        data={item.images}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => HandlePreview(item)}
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
              <Image
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 10,
                  resizeMode: "cover",
                }}
                source={{ uri: `data:image/png;base64,${item}` }}
              />
            </Pressable>
          );
        }}
      />

      <View
        style={{
          flex: 1,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={item.members}
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
                  height: 45,
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white",
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
              </View>
            );
          }}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  height: 45,
                  justifyContent: "center",
                  paddingLeft: 13,
                  paddingRight: 13,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "#333333",
                  }}
                >
                  Participating member(s)
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
                  Empty Members
                </Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
