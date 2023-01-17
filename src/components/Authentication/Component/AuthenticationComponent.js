import { Dimensions, View, Text, Pressable, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function AuthenticationComponent({
  item,
  isSINLogin,
  setSINLogin,
  isPasswordLogin,
  setPasswordLogin,
  isSINRegister,
  setSINRegister,
  isPasswordRegister,
  setPasswordRegister,
  _Login,
  _Register,
  isLoginError,
  isFullname,
  setFullname,
  isRegisterError,
  isPL,
  isPR,
  setPR,
  setPL,
  isRegisterSuccess,
  isState,
}) {
  return (
    <View
      style={{
        width: Dimensions.get("screen").width,
      }}
    >
      {item.name === "register" && (
        <View
          style={{
            borderBottomWidth: 0.6,
            marginRight: 25,
            marginLeft: 25,
            marginTop: 13,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            value={isFullname}
            onChangeText={(text) => setFullname(text)}
            style={{
              paddingTop: 13,
              paddingBottom: 13,
              flex: 1,
              textTransform: "capitalize",
            }}
            cursorColor="black"
            placeholder="Your full name"
          />
          {isFullname.length !== 0 ? (
            <Pressable
              onPress={() => setFullname("")}
              style={{ marginLeft: 5 }}
            >
              <Ionicons name="ios-close-circle" size={15} color="#212121" />
            </Pressable>
          ) : undefined}
        </View>
      )}
      <View
        style={{
          borderBottomWidth: 0.6,
          marginRight: 25,
          marginLeft: 25,
          marginTop: item.name === "signin" ? 13 : 0,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          value={item.name === "signin" ? isSINLogin : isSINRegister}
          onChangeText={(text) =>
            item.name === "signin" ? setSINLogin(text) : setSINRegister(text)
          }
          style={{
            paddingTop: 13,
            paddingBottom: 13,
            flex: 1,
          }}
          cursorColor="black"
          placeholder="School Number Ex. 1812xxxx"
          keyboardType="numeric"
        />
        {isSINLogin.length !== 0 && item.name === "signin" ? (
          <Pressable onPress={() => setSINLogin("")} style={{ marginLeft: 5 }}>
            <Ionicons name="ios-close-circle" size={15} color="#212121" />
          </Pressable>
        ) : isSINRegister.length !== 0 && item.name === "register" ? (
          <Pressable
            onPress={() => setSINRegister("")}
            style={{ marginLeft: 5 }}
          >
            <Ionicons name="ios-close-circle" size={15} color="#212121" />
          </Pressable>
        ) : undefined}
      </View>
      <View
        style={{
          borderBottomWidth: 0.6,
          marginRight: 25,
          marginLeft: 25,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          value={item.name === "signin" ? isPasswordLogin : isPasswordRegister}
          onChangeText={(text) =>
            item.name === "signin"
              ? setPasswordLogin(text)
              : setPasswordRegister(text)
          }
          style={{ paddingTop: 13, paddingBottom: 13, flex: 1 }}
          cursorColor="black"
          placeholder="Password"
          secureTextEntry={item.name === "signin" ? isPL : isPR}
        />
        {isPasswordLogin.length !== 0 && item.name === "signin" ? (
          <Pressable onPress={() => setPL(!isPL)} style={{ marginLeft: 5 }}>
            <Ionicons
              name={isPL ? "md-eye-off" : "md-eye"}
              size={15}
              color="#212121"
            />
          </Pressable>
        ) : isPasswordRegister.length !== 0 && item.name === "register" ? (
          <Pressable onPress={() => setPR(!isPR)} style={{ marginLeft: 5 }}>
            <Ionicons
              name={isPR ? "md-eye-off" : "md-eye"}
              size={15}
              color="#212121"
            />
          </Pressable>
        ) : undefined}
      </View>
      {item.name === "signin" && isLoginError !== "" ? (
        <View style={{ paddingRight: 25, paddingLeft: 25, paddingTop: 5 }}>
          <Text
            style={{
              fontSize: 11,
              color: "#CD3130",
              textTransform: "capitalize",
            }}
          >
            *{isLoginError}
          </Text>
        </View>
      ) : undefined}
      {item.name === "register" && isRegisterError !== "" ? (
        <View style={{ paddingRight: 25, paddingLeft: 25, paddingTop: 5 }}>
          <Text
            style={{
              fontSize: 11,
              color: "#CD3130",
              textTransform: "capitalize",
            }}
          >
            *{isRegisterError}
          </Text>
        </View>
      ) : undefined}
      {item.name === "register" && isRegisterSuccess !== "" ? (
        <View style={{ paddingRight: 25, paddingLeft: 25, paddingTop: 5 }}>
          <Text
            style={{
              fontSize: 11,
              color: "#72D72D",
              textTransform: "capitalize",
            }}
          >
            {isRegisterSuccess}
          </Text>
        </View>
      ) : undefined}
      <View style={{ padding: 13 }}>
        <Pressable
          onPress={() => (item.name === "signin" ? _Login() : _Register())}
          style={{
            backgroundColor: "#212121",
            paddingLeft: 13,
            paddingRight: 13,
            height: 45,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "800",
              color: "white",
              textTransform: "uppercase",
            }}
          >
            {item.name === "signin" ? "sign in" : "register"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
