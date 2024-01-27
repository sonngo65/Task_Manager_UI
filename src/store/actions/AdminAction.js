import useFetchTaskUser from "../../customHook/useFetchTaskUser";
import useFetchUser from "../../customHook/useFetchUser";
import useFetchWorkspace from "../../customHook/useFetchWorkspace";
import {
  ADD_ADMIN_USER,
  DELETE_ADMIN_USERS_FAILURE,
  DELETE_ADMIN_USERS_REQUEST,
  DELETE_ADMIN_USERS_SUCCESSED,
  LOAD_ADMIN_TASKS_FAILURE,
  LOAD_ADMIN_TASKS_REQUEST,
  LOAD_ADMIN_TASKS_SUCCESSED,
  LOAD_ADMIN_USERS_REQUEST,
  LOAD_ADMIN_USERS_SUCCESSED,
  LOAD_ADMIN_WORKSPACES_FAILURE,
  LOAD_ADMIN_WORKSPACES_REQUEST,
  LOAD_ADMIN_WORKSPACES_SUCCESSED,
  SET_ADMIN_IS_CHANGED_USER,
  SET_ADMIN_IS_CHOICE_USER,
  SET_ADMIN_USER,
  UPDATE_OR_ADD_ADMIN_USERS_FAILURE,
  UPDATE_OR_ADD_ADMIN_USERS_REQUEST,
  UPDATE_OR_ADD_ADMIN_USERS_SUCCESSED,
} from "../reducers/AdminReducer/constants";

export const getAdminTasksByWorkspaceIdAndUserId = (workspaceId, userId) => {
  return async function thunk(dispatch, getState) {
    const getDetailByWorkspaceIdAndUserId =
      useFetchTaskUser.getDetailByWorkspaceIdAndUserId;
    const getRoleWorkspace = useFetchWorkspace.getRoleWorkspace;

    dispatch({ type: LOAD_ADMIN_TASKS_REQUEST });
    try {
      const data = await getDetailByWorkspaceIdAndUserId(workspaceId, userId);
      const role = await getRoleWorkspace(workspaceId, userId);
      dispatch({
        type: LOAD_ADMIN_TASKS_SUCCESSED,
        payload: { list: data, statistic: false, roleName: role.name },
      });
    } catch (error) {
      dispatch({ type: LOAD_ADMIN_TASKS_FAILURE, payload: error });
    }
  };
};

export const getAdminTasksByFirstWorkspaceAndUserId = (userId) => {
  return async function thunk(dispatch, getState) {
    const getDetailByFirstWorkspaceAndUserId =
      useFetchTaskUser.getDetailByFirstWorkspaceAndUserId;
    const loadStatistic = useFetchTaskUser.loadStatistic;
    const getRoleFirstWorkspace = useFetchWorkspace.getRoleFirstWorkspace;
    dispatch({ type: LOAD_ADMIN_TASKS_REQUEST });
    try {
      const tasks = await getDetailByFirstWorkspaceAndUserId(userId);
      const statistic = await loadStatistic(userId);
      const role = await getRoleFirstWorkspace(userId);
      const data = { list: tasks, statistic, roleName: role.name };
      dispatch({ type: LOAD_ADMIN_TASKS_SUCCESSED, payload: data });
    } catch (error) {
      dispatch({ type: LOAD_ADMIN_TASKS_FAILURE, payload: error });
    }
  };
};
export const getAllUser = () => {
  return function thunk(dispatch, getState) {
    const getAll = useFetchUser.getAll;
    dispatch({ type: LOAD_ADMIN_USERS_REQUEST });
    getAll()
      .then((data) =>
        dispatch({ type: LOAD_ADMIN_USERS_SUCCESSED, payload: data })
      )
      .catch((error) =>
        dispatch({ type: LOAD_ADMIN_TASKS_FAILURE, payload: error })
      );
  };
};
export const getAllWorkspaceByUserId = (userId) => {
  return function thunk(dispatch, getState) {
    const getAllByUserId = useFetchWorkspace.getAllByUserId;
    dispatch({ type: LOAD_ADMIN_WORKSPACES_REQUEST });
    getAllByUserId(userId)
      .then((data) =>
        dispatch({ type: LOAD_ADMIN_WORKSPACES_SUCCESSED, payload: data })
      )
      .catch((error) =>
        dispatch({ type: LOAD_ADMIN_WORKSPACES_FAILURE, payload: error })
      );
  };
};
export const updateOrAddUsers = (users) => {
  return function thunk(dispatch, getState) {
    const updateAll = useFetchUser.updateAll;
    dispatch({ type: UPDATE_OR_ADD_ADMIN_USERS_REQUEST });
    updateAll(users)
      .then((data) =>
        dispatch({ type: UPDATE_OR_ADD_ADMIN_USERS_SUCCESSED, payload: data })
      )
      .catch((error) =>
        dispatch({ type: UPDATE_OR_ADD_ADMIN_USERS_FAILURE, payload: error })
      );
  };
};
export const deleteUsers = (users) => {
  return function thunk(dispatch, getState) {
    const deleteAll = useFetchUser.deleteAll;
    dispatch({ type: DELETE_ADMIN_USERS_REQUEST });
    deleteAll(users)
      .then((data) =>
        dispatch({ type: DELETE_ADMIN_USERS_SUCCESSED, payload: data })
      )
      .catch((error) =>
        dispatch({ type: DELETE_ADMIN_USERS_FAILURE, payload: error })
      );
  };
};
export const setUser = (currentState, valueName, value) => {
  return { type: SET_ADMIN_USER, payload: { currentState, valueName, value } };
};
export const addUser = () => {
  return { type: ADD_ADMIN_USER };
};
export const setIsChoiceUser = (id) => {
  return {
    type: SET_ADMIN_IS_CHOICE_USER,
    payload: id,
  };
};
export const setIsChangedUser = (id) => {
  return {
    type: SET_ADMIN_IS_CHANGED_USER,
    payload: id,
  };
};
