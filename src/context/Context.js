import { createContext, useReducer, useMemo, useState } from "react";
import { Reducer, InitialState } from "./Reducer";
import { ACTION_TYPES } from "./ActionType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const ConcellContext = createContext();

export function ConcellProvider({ children }) {
  const [isState, setDispatch] = useReducer(Reducer, InitialState);
  const [isTrue, setTrue] = useState(false);
  const [isBackground, setBackground] = useState(false);
  const [isRoomData, setRoomData] = useState([]);
  const [isLoginError, setLoginError] = useState("");
  const [isRegisterError, setRegistererror] = useState("");
  const [isRegisterSuccess, setRegisterSuccess] = useState("");
  const [isEmailError, setEmailError] = useState("");
  const [isPasswordError, setPasswordError] = useState("");
  const [isSuccess, setSuccess] = useState(false);
  const [isRoomError, setRoomError] = useState("");
  const [CreateScheduleError, setCreateScheduleError] = useState("");
  const [roomCodeError, setRoomCodeError] = useState("");
  const [isSINError, setSINError] = useState("");

  const CreateSchedule = async (
    title,
    description,
    from,
    to,
    date,
    members,
    image1,
    image2,
    image3,
    navigation
  ) => {
    let token = await AsyncStorage.getItem("token");
    let tempImages = [];

    if (title === "") {
      return setCreateScheduleError("Title is required");
    } else if (description === "") {
      return setCreateScheduleError("Description is required");
    } else if (from === "") {
      return setCreateScheduleError("From date is required");
    } else if (to === "") {
      return setCreateScheduleError("To date is required");
    } else if (date === "") {
      return setCreateScheduleError("Date is required");
    } else if (members.length === 0) {
      return setCreateScheduleError(
        "At least one participant should be added to the schedule"
      );
    } else {
      setCreateScheduleError("");
    }

    image1 !== "" && tempImages.push(image1);
    image2 !== "" && tempImages.push(image2);
    image3 !== "" && tempImages.push(image3);

    setDispatch({ type: ACTION_TYPES.FETCH_START });
    await fetch("https://concell.onrender.com/api/concell/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        _id: isState.selectedRoomData._id,
        creator_id: isState.user._id,
        title: title,
        description: description,
        From: from,
        To: to,
        Date: date,
        members: members,
        images: tempImages,
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          GetRooms();
          navigation.pop(2);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const JoinRoom = async (code, navigation) => {
    let token = await AsyncStorage.getItem("token");

    if (code === "") {
      return setRoomCodeError("Please type the code");
    } else if (code.length !== 6) {
      return setRoomCodeError("room code must have 6 characters");
    }

    setDispatch({ type: ACTION_TYPES.FETCH_START });

    await fetch("https://concell.onrender.com/api/concell/join/room", {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        _id: isState.user._id,
        code: code,
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then(async (result) => {
        if (result.status === false) return setRoomCodeError(result.message);
        if (result.status) {
          await SetNotifications(
            result.data.creator_id,
            `${isState.user.name} entered the ${result.data.room_name} room.`
          );
          setRoomCodeError("");
          GetRooms();
          navigation.pop();
        }
      })
      .catch((error) => console.log("error", error));
    setDispatch({ type: ACTION_TYPES.FETCH_STOP });
  };

  const loginAuth = async (sin, password) => {
    if (sin === "") {
      return setLoginError("please type your school identification number");
    } else if (password === "") {
      return setLoginError("please type your password");
    } else {
      setLoginError("");
    }

    setDispatch({ type: ACTION_TYPES.FETCH_START });
    await fetch("https://concell.onrender.com/api/concell/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        school_identification_number: sin,
        password: password,
      }),
      redirect: "follow",
    })
      .then((response) => Promise.all([response.json(), response.headers]))
      .then(async ([result, headers]) => {
        if (result.error) {
          setDispatch({ type: ACTION_TYPES.FETCH_STOP });
          return setLoginError(
            "password length must be at least 6 characters long"
          );
        }
        if (result.status === false) {
          setDispatch({ type: ACTION_TYPES.FETCH_STOP });
          return setLoginError(result.message);
        }
        try {
          await AsyncStorage.multiSet([
            ["token", headers.map.token],
            ["user", JSON.stringify(result)],
          ]);
          let user = await AsyncStorage.getItem("user");
          setLoginError("");
          setDispatch({
            type: ACTION_TYPES.FETCH_LOGIN,
            payload: JSON.parse(user).position,
            data: JSON.parse(user),
          });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const registerAuth = async (sin, password, name, position, navigation) => {
    if (name === "") {
      return setRegistererror("please type your full name ex. FN|MN|LN");
    } else if (sin === "") {
      return setRegistererror("please type your school identification number");
    } else if (password === "") {
      return setRegistererror("please type your password");
    } else {
      setRegistererror("");
      setRegisterSuccess("");
    }

    setDispatch({ type: ACTION_TYPES.FETCH_START });
    await fetch("https://concell.onrender.com/api/concell/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        school_identification_number: sin,
        name: name,
        password: password,
        position: position ? position : "student",
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          return setRegistererror(
            "School Identification Number must be less than or equal to 8"
          );
        }
        if (!result.status) {
          return setRegistererror(result.message);
        }
        if (result.status) {
          navigation?.pop();
          setRegisterSuccess(result.message);
        }
      })
      .catch((error) => console.log("error", error));
    setDispatch({ type: ACTION_TYPES.FETCH_STOP });
  };

  const createRoom = async (title, description, navigation) => {
    if (title === "") {
      return setRoomError("please type your room name");
    } else if (description === "") {
      return setRoomError("please type your room details");
    } else {
      setRoomError("");
    }

    let token = await AsyncStorage.getItem("token");
    setDispatch({ type: ACTION_TYPES.FETCH_START });
    await fetch("https://concell.onrender.com/api/concell/room/create", {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        room_name: title,
        room_details: description,
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message) {
          GetRooms();
          navigation.goBack();
        }
      })
      .catch((error) => console.log("error", error));
    setDispatch({ type: ACTION_TYPES.FETCH_STOP });
  };

  const verifyToken = async () => {
    let token = await AsyncStorage.getItem("token");
    setDispatch({ type: ACTION_TYPES.FETCH_START });
    await fetch("https://concell.onrender.com/api/concell/user/verify", {
      method: "POST",
      headers: {
        token: token,
      },
      redirect: "follow",
    })
      .then((response) => response.json())
      .then(async (result) => {
        if (result.status === true) {
          let user = await AsyncStorage.getItem("user");
          setDispatch({
            type: ACTION_TYPES.FETCH_LOGIN,
            payload: JSON.parse(user).position,
            data: JSON.parse(user),
          });
          return;
        }
        try {
          let keys = ["token", "user"];
          await AsyncStorage.multiRemove(keys);
          setDispatch({ type: ACTION_TYPES.FETCH_STOP });
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const updateImage = async (image) => {
    let token = await AsyncStorage.getItem("token");

    setDispatch({ type: ACTION_TYPES.FETCH_START });
    await fetch("https://concell.onrender.com/api/concell/user/photo", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        _id: isState.user._id,
        image: image,
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          MySchedules();
          GetRooms();
          refreshUserData();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const updateSIN = async (school_identification_number, navigation) => {
    if (school_identification_number.length !== 8)
      return setErrorText(
        "School identification number must have eight digits."
      );

    let token = await AsyncStorage.getItem("token");

    setDispatch({ type: ACTION_TYPES.FETCH_START });
    await fetch("https://concell.onrender.com/api/concell/user/sin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        _id: isState.user._id,
        school_identification_number: school_identification_number,
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.status) return setSINError(result.message);
        if (result.status === true) {
          navigation.pop();
          MySchedules();
          GetRooms();
          refreshUserData();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const updateName = async (name, navigation) => {
    let token = await AsyncStorage.getItem("token");

    setDispatch({ type: ACTION_TYPES.FETCH_START });
    await fetch("https://concell.onrender.com/api/concell/user/name", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        _id: isState.user._id,
        name: name,
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === true) {
          navigation.pop();
          MySchedules();
          GetRooms();
          refreshUserData();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const updateEmail = async (email, navigation) => {
    let token = await AsyncStorage.getItem("token");

    setDispatch({ type: ACTION_TYPES.FETCH_START });
    await fetch("https://concell.onrender.com/api/concell/user/email", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        _id: isState.user._id,
        email: email,
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          setDispatch({ type: ACTION_TYPES.FETCH_STOP });
          return setEmailError(result.error);
        }
        setEmailError("");
        if (result.status === true) {
          navigation.pop();
          MySchedules();
          GetRooms();
          refreshUserData();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const updatePassword = async (password, new_password) => {
    let token = await AsyncStorage.getItem("token");

    setDispatch({ type: ACTION_TYPES.FETCH_START });
    await fetch("https://concell.onrender.com/api/concell/user/password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        _id: isState.user._id,
        password: password,
        new_password: new_password,
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === false) {
          setDispatch({ type: ACTION_TYPES.FETCH_STOP });
          return setPasswordError(result.message);
        }
        if (result.status === true) {
          setSuccess(true);
          refreshUserData();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const refreshUserData = async () => {
    let token = await AsyncStorage.getItem("token");

    await fetch("https://concell.onrender.com/api/concell/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({
        _id: isState.user._id,
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then(async (result) => {
        await AsyncStorage.setItem("user", JSON.stringify(result));
        let user = await AsyncStorage.getItem("user");
        setDispatch({
          type: ACTION_TYPES.FETCH_RETRIEVE,
          data: JSON.parse(user),
        });
      })
      .catch((error) => console.log("error", error));
  };

  const ActionType = useMemo(
    () => ({
      FETCH_LOGIN: async (sin, password) => {
        await loginAuth(sin, password);
      },
      FETCH_LOGOUT: async () => {
        try {
          let keys = ["token", "user"];
          await AsyncStorage.multiRemove(keys);
          return setDispatch({ type: ACTION_TYPES.FETCH_LOGOUT });
        } catch (error) {
          console.log(error);
        }
      },
      FETCH_REGISTER: async (sin, password, name, position, navigation) => {
        await registerAuth(sin, password, name, position, navigation);
      },
      FETCH_START: async () => {
        setDispatch({ type: ACTION_TYPES.FETCH_START });
      },
      FETCH_STOP: async () => {
        setDispatch({ type: ACTION_TYPES.FETCH_STOP });
      },
      FETCH_SELECTED_ROOM_DATA: async (item) => {
        setDispatch({
          type: ACTION_TYPES.FETCH_SELECTED_ROOM_DATA,
          payload: item,
        });
      },
      FETCH_SELECTED_SCHEDULE: async (item) => {
        setDispatch({
          type: ACTION_TYPES.FETCH_SELECTED_SCHEDULE,
          payload: item,
        });
      },
    }),
    []
  );

  const GetRooms = async () => {
    let token = await AsyncStorage.getItem("token");

    setDispatch({
      type: ACTION_TYPES.FETCH_START,
    });

    try {
      await fetch(
        isState.position === "faculty"
          ? "https://concell.onrender.com/api/concell/room"
          : isState.position === "student"
          ? "https://concell.onrender.com/api/concell/student/room"
          : undefined,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", token: token },
          body: JSON.stringify({
            _id: isState.user._id,
          }),
          redirect: "follow",
        }
      )
        .then((response) => response.json())
        .then((result) =>
          setDispatch({
            type: ACTION_TYPES.FETCH_ROOM,
            payload: result,
          })
        )
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  const MySchedules = async () => {
    let token = await AsyncStorage.getItem("token");

    setDispatch({
      type: ACTION_TYPES.FETCH_START,
    });

    try {
      await fetch(
        isState.position === "faculty"
          ? "https://concell.onrender.com/api/concell/room/all/schedules"
          : isState.position === "student"
          ? "https://concell.onrender.com/api/concell/room/student/schedules"
          : undefined,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", token: token },
          body: JSON.stringify({
            _id: isState.user._id,
          }),
          redirect: "follow",
        }
      )
        .then((response) => response.json())
        .then((result) =>
          setDispatch({
            type: ACTION_TYPES.FETCH_MYSCHEDULES,
            payload: result,
          })
        )
        .catch((error) => console.log("error", error));
    } catch (error) {
      console.log(error);
    }
  };

  const SetNotifications = async (_id, body) => {
    let token = await AsyncStorage.getItem("token");
    setDispatch({
      type: ACTION_TYPES.FETCH_START,
    });
    await fetch("https://concell.onrender.com/api/concell/notification", {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        creator_id: _id,
        message: body,
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.status) {
          Alert.alert(
            "Reminder",
            "No alert was sent to the user. There was an error."
          );
        }
        if (result.status) {
          GetRooms();
          MySchedules();
          GetNotifications();
        }
      })
      .catch((error) => console.log("error", error));
  };

  const GetNotifications = async () => {
    let token = await AsyncStorage.getItem("token");
    setDispatch({
      type: ACTION_TYPES.FETCH_START,
    });
    await fetch("https://concell.onrender.com/api/concell/notification/all", {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        _id: isState.user._id,
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        setDispatch({
          type: ACTION_TYPES.FETCH_NOTIFICATIONS,
          payload: result,
        });
      })
      .catch((error) => console.log("error", error));
  };

  const GetUserByPosition = async (position) => {
    let token = await AsyncStorage.getItem("token");
    setDispatch({
      type: ACTION_TYPES.FETCH_START,
    });
    await fetch("https://concell.onrender.com/api/concell/user/position", {
      method: "POST",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        position: position,
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) =>
        setDispatch({
          type:
            position === "faculty"
              ? ACTION_TYPES.FETCH_FACULTY
              : position === "student"
              ? ACTION_TYPES.FETCH_STUDENTS
              : undefined,
          payload: result,
        })
      )
      .catch((error) => console.log("error", error));
  };

  const RefreshUser = () => {
    GetUserByPosition("student");
    GetUserByPosition("faculty");
  };

  const KickMember = async (user_id, navigation) => {
    let token = await AsyncStorage.getItem("token");

    setDispatch({
      type: ACTION_TYPES.FETCH_START,
    });

    await fetch("https://concell.onrender.com/api/concell/member/kick", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        _id: isState.selectedRoomData._id,
        user_id: user_id,
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then(async (result) => {
        if (result.status) {
          await SetNotifications(
            user_id,
            `You've been kick from the "${isState.selectedRoomData.room_name}" room.`
          );
          GetRooms();
          MySchedules();
          GetNotifications();
          navigation.pop(2);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const LeaveRoom = async (user_id, name, navigation) => {
    let token = await AsyncStorage.getItem("token");

    setDispatch({
      type: ACTION_TYPES.FETCH_START,
    });

    await fetch("https://concell.onrender.com/api/concell/leave/room", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        _id: isState.selectedRoomData._id,
        user_id: user_id,
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then(async (result) => {
        if (result.status) {
          await SetNotifications(
            isState.selectedRoomData.creator_id,
            `${name} leave from the "${isState.selectedRoomData.room_name}" room.`
          );
          GetRooms();
          MySchedules();
          GetNotifications();
          navigation.pop(2);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const Comment = async (comment, navigation) => {
    let token = await AsyncStorage.getItem("token");

    setDispatch({
      type: ACTION_TYPES.FETCH_START,
    });

    await fetch("https://concell.onrender.com/api/concell/add/comment", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", token: token },
      body: JSON.stringify({
        _id: isState.selectedSchedule._id,
        comment_id: isState.user._id,
        comment: comment,
        name: isState.user.name,
        image: isState.user.image ? isState.user.image : "",
      }),
      redirect: "follow",
    })
      .then((response) => response.json())
      .then(async (result) => {
        if (result.status) {
          await SetNotifications(
            isState.selectedRoomData.creator_id,
            `${isState.user.name} commented on "${isState.selectedSchedule.title}" schedule.`
          );
          GetRooms();
          navigation.popToTop();
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <ConcellContext.Provider
      value={{
        isState,
        ActionType,
        GetRooms,
        isTrue,
        setTrue,
        isBackground,
        setBackground,
        isRoomData,
        setRoomData,
        verifyToken,
        isLoginError,
        isRegisterError,
        isRegisterSuccess,
        isEmailError,
        isPasswordError,
        isSuccess,
        setPasswordError,
        updateImage,
        updateSIN,
        updateName,
        updateEmail,
        updatePassword,
        createRoom,
        isRoomError,
        MySchedules,
        CreateScheduleError,
        CreateSchedule,
        JoinRoom,
        roomCodeError,
        GetNotifications,
        RefreshUser,
        GetUserByPosition,
        setRegistererror,
        setRegisterSuccess,
        setLoginError,
        isSINError,
        KickMember,
        LeaveRoom,
        Comment,
      }}
    >
      {children}
    </ConcellContext.Provider>
  );
}

export default ConcellContext;
