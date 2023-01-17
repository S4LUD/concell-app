import { useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Platform,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ConcellContext from "../../../context/Context";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ProfileDetailsScreen({ navigation }) {
  const { updateImage, isState } = useContext(ConcellContext);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });

    if (!result.canceled) {
      updateImage(result.assets[0].base64, isState.user._id, navigation);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
      <Pressable
        disabled={isState.loading}
        onPress={() => pickImage()}
        style={{
          marginTop: 13,
          backgroundColor: "white",
          padding: 13,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 14, color: "#333333" }}>
            Profile Picture
          </Text>
          <View>
            <Ionicons
              name="ios-chevron-forward-outline"
              size={16}
              color="#73777B"
            />
          </View>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: 13,
          }}
        >
          {isState.user.image ? (
            <View>
              <Image
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 100,
                  resizeMode: "contain",
                }}
                source={{ uri: `data:image/png;base64,${isState.user.image}` }}
              />
              {isState.loading ? (
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ActivityIndicator size={"large"} />
                </View>
              ) : undefined}
            </View>
          ) : (
            <FontAwesome name="user-circle" size={70} color="#585757" />
          )}
        </View>
      </Pressable>
      <View
        style={{
          backgroundColor: "white",
          marginTop: 13,
        }}
      >
        <Pressable
          onPress={() => navigation.navigate("SchoolNumber")}
          style={{
            height: 45,
            paddingLeft: 13,
            paddingRight: 13,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 14, color: "#333333" }}>
            School Number<Text style={{ color: "#CD3130" }}>*</Text>
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 14, color: "#73777B" }}>
              {isState.user.school_identification_number}
            </Text>
            <Ionicons
              name="ios-chevron-forward-outline"
              size={16}
              color="#73777B"
            />
          </View>
        </Pressable>
        <View
          style={{
            borderBottomWidth: 0.6,
            borderBottomColor: "#EEF2F6",
          }}
        />
        <Pressable
          onPress={() => navigation.navigate("MyName")}
          style={{
            height: 45,
            paddingLeft: 13,
            paddingRight: 13,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 14, color: "#333333" }}>Name</Text>
          <View
            style={{
              flexDirection: "row",
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
              {isState.user.name}
            </Text>
            <Ionicons
              name="ios-chevron-forward-outline"
              size={16}
              color="#73777B"
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
