import { ACTION_TYPES } from "./ActionType";

export const InitialState = {
  loading: false,
  status: false,
  position: "",
  user: [],
  room: [],
  schedules: [],
  selectedRoomData: [],
  selectedSchedule: {},
  notifications: [],
  student: [],
  faculty: [],
  counter: 0,
};

export const Reducer = (prevState, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_LOGIN:
      return {
        ...prevState,
        status: true,
        position: action.payload,
        user: action.data,
        loading: false,
      };
    case ACTION_TYPES.FETCH_FACULTY:
      return {
        ...prevState,
        faculty: action.payload,
        loading: false,
      };
    case ACTION_TYPES.FETCH_STUDENTS:
      return {
        ...prevState,
        student: action.payload,
        loading: false,
      };
    case ACTION_TYPES.FETCH_NOTIFICATIONS:
      return {
        ...prevState,
        notifications: action.payload,
        loading: false,
      };
    case ACTION_TYPES.FETCH_RETRIEVE:
      return {
        ...prevState,
        user: action.data,
        loading: false,
      };
    case ACTION_TYPES.FETCH_ROOM:
      return {
        ...prevState,
        room: action.payload,
        loading: false,
      };
    case ACTION_TYPES.FETCH_MYSCHEDULES:
      return {
        ...prevState,
        schedules: action.payload,
        loading: false,
      };
    case ACTION_TYPES.FETCH_SELECTED_ROOM_DATA:
      return {
        ...prevState,
        selectedRoomData: action.payload,
        loading: false,
      };
    case ACTION_TYPES.FETCH_SELECTED_SCHEDULE:
      return {
        ...prevState,
        selectedSchedule: action.payload,
        loading: false,
      };
    case ACTION_TYPES.FETCH_LOGOUT:
      return {
        ...prevState,
        status: false,
        position: "",
        user: [],
        room: [],
        schedules: [],
        selectedRoomData: [],
        notifications: [],
      };
    case ACTION_TYPES.FETCH_START:
      return {
        ...prevState,
        loading: true,
      };
    case ACTION_TYPES.FETCH_STOP:
      return {
        ...prevState,
        loading: false,
      };
    default:
      return prevState;
  }
};
