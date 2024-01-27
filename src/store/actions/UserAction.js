import { thunk } from "redux-thunk";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESSED,
  LOGOUT,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESSED,
  LOAD_USER_FAILURE,
} from "../reducers/UserReducer/constants";
import useFetchUser from "../../customHook/useFetchUser";
export const login = (username, password) => {
  return function thunk(dispatch, getState) {
    const getByUsernameAndPassword = useFetchUser.getByUsernameAndPassword;
    dispatch({ type: LOGIN_REQUEST });
    return getByUsernameAndPassword(username, password)
      .then((data) => dispatch({ type: LOGIN_SUCCESSED, payload: data }))
      .catch((error) => dispatch({ type: LOGIN_FAILURE, payload: error }));
  };
};

export const loadUser = () => {
  return function thunk(dispatch, getState) {
    const getByAuthentication = useFetchUser.getByAuthentication;
    dispatch({ type: LOAD_USER_REQUEST });
    return getByAuthentication()
      .then((data) => dispatch({ type: LOAD_USER_SUCCESSED, payload: data }))
      .catch((error) => dispatch({ type: LOAD_USER_FAILURE, payload: error }));
  };
};
export const logout = () => {
  return { type: LOGOUT };
};
