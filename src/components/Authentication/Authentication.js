import { useContext, useRef, useState, useLayoutEffect } from "react";
import {
  View,
  Dimensions,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import AuthenticationComponent from "./Component/AuthenticationComponent";
import HeaderComponent from "./Component/HeaderComponent";
import ConcellContext from "../../context/Context";

export default function AuthenticationScreenComponent({ navigation }) {
  const flatListRef = useRef();
  const [isSINLogin, setSINLogin] = useState("");
  const [isPasswordLogin, setPasswordLogin] = useState("");
  const [isFullname, setFullname] = useState("");
  const [isSINRegister, setSINRegister] = useState("");
  const [isPasswordRegister, setPasswordRegister] = useState("");
  const [currentSelected, setcurrentSelected] = useState("signin");
  const {
    ActionType,
    isState,
    verifyToken,
    isLoginError,
    isRegisterError,
    isRegisterSuccess,
    setRegistererror,
    setRegisterSuccess,
    setLoginError,
  } = useContext(ConcellContext);
  const [isPL, setPL] = useState(true);
  const [isPR, setPR] = useState(true);

  useLayoutEffect(() => {
    verifyToken();
  }, []);

  const ClearError = () => {
    setLoginError("");
    setRegistererror("");
    setRegisterSuccess("");
  };

  const AuthArrayComponent = [
    {
      _id: 1,
      name: "signin",
      email: "",
      password: "",
    },
    {
      _id: 2,
      name: "register",
      email: "",
      password: "",
    },
  ];

  const scrollToLogin = () => {
    setcurrentSelected("signin");
    setPasswordRegister("");
    setSINRegister("");
    setFullname("");
    ClearError();
    flatListRef.current.scrollToIndex({ animated: true, index: 0 });
  };

  const scrollToRegister = () => {
    setcurrentSelected("register");
    setSINLogin("");
    setPasswordLogin("");
    ClearError();
    flatListRef.current.scrollToIndex({ animated: true, index: 1 });
  };

  const _Login = () => {
    ActionType.FETCH_LOGIN(isSINLogin, isPasswordLogin);
    ClearError();
  };

  const _Register = () => {
    ActionType.FETCH_REGISTER(isSINRegister, isPasswordRegister, isFullname);
    ClearError();
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "white",
        position: "relative",
      }}
    >
      {isState.loading && (
        <View
          style={{
            zIndex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={40} />
          <Text
            style={{
              color: "white",
              textTransform: "capitalize",
              paddingTop: 13,
              fontSize: 16,
            }}
          >
            loading..., kindly wait
          </Text>
        </View>
      )}
      <HeaderComponent
        scrollToLogin={scrollToLogin}
        scrollToRegister={scrollToRegister}
        currentSelected={currentSelected}
        isState={isState}
      />
      <FlatList
        horizontal
        pagingEnabled
        scrollEnabled={false}
        data={AuthArrayComponent}
        renderItem={({ item }) => (
          <AuthenticationComponent
            item={item}
            isSINLogin={isSINLogin}
            setSINLogin={setSINLogin}
            isPasswordLogin={isPasswordLogin}
            setPasswordLogin={setPasswordLogin}
            isSINRegister={isSINRegister}
            setSINRegister={setSINRegister}
            isPasswordRegister={isPasswordRegister}
            setPasswordRegister={setPasswordRegister}
            _Login={_Login}
            _Register={_Register}
            isLoginError={isLoginError}
            isRegisterError={isRegisterError}
            isFullname={isFullname}
            setFullname={setFullname}
            isPR={isPR}
            isPL={isPL}
            setPR={setPR}
            setPL={setPL}
            isRegisterSuccess={isRegisterSuccess}
            isState={isState}
          />
        )}
        keyExtractor={(item) => item._id}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: Dimensions.get("screen").width,
          offset: Dimensions.get("screen").width * index,
          index,
        })}
        ref={flatListRef}
      />
    </View>
  );
}
