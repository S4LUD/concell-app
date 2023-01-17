import { View, Text, Pressable, Image } from "react-native";
import Icon from "../../../../assets/icon.png";

export default function HeaderComponent({
  scrollToLogin,
  scrollToRegister,
  currentSelected,
  isState,
}) {
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Image source={Icon} style={{ width: 100, height: 100 }} />
        <Text
          style={{
            fontSize: 25,
            fontWeight: "900",
            letterSpacing: 10,
          }}
        >
          CONCELL
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginRight: 25,
          marginLeft: 25,
          marginTop: 25,
        }}
      >
        <Pressable
          disabled={isState.loading}
          style={{
            flex: 1,
            alignItems: "center",
          }}
          onPress={() => scrollToLogin()}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              paddingBottom: 5,
              borderBottomWidth: currentSelected === "signin" ? 2 : 0,
            }}
          >
            SIGN IN
          </Text>
        </Pressable>
        <Pressable
          disabled={isState.loading}
          style={{
            flex: 1,
            alignItems: "center",
          }}
          onPress={() => scrollToRegister()}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
              paddingBottom: 5,
              borderBottomWidth: currentSelected === "register" ? 2 : 0,
            }}
          >
            REGISTER
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
