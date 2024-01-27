import {
  LOGIN_REQUEST,
  LOGIN_SUCCESSED,
  LOGIN_FAILURE,
  LOGOUT,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESSED,
  LOAD_USER_FAILURE,
} from "../../constant";
const initialState = {
  user: {},
  isLogin: false,
  processing: false,
  error: null,
};
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, processing: true };
    case LOGIN_SUCCESSED:
      sessionStorage.setItem("token", action.payload.token);
      return { ...state, processing: false, isLogin: true, error: null };
    case LOGIN_FAILURE:
      console.log(action.payload);
      return { ...state, processing: false, error: action.payload.message };
    case LOAD_USER_REQUEST:
      return { ...state, processing: true };
    case LOAD_USER_SUCCESSED:
      return {
        ...state,
        processing: false,
        user: action.payload,
        isLogin: true,
      };
    case LOAD_USER_FAILURE:
      return { ...state, processing: false };
    case LOGOUT:
      sessionStorage.removeItem("token");
      return { ...state, user: {}, isLogin: false };
    default:
      return state;
  }
};
export default UserReducer;
