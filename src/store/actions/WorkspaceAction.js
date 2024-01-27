import useFetchWorkspace from "../../customHook/useFetchWorkspace";
import {
  LOAD_WORKSPACES_REQUEST,
  LOAD_WORKSPACES_SUCCESSED,
  LOAD_WORKSPACES_FAILURE,
  LOAD_WORKSPACE_BY_ID_REQUEST,
  LOAD_WORKSPACE_BY_ID_SUCCESSED,
  LOAD_WORKSPACE_BY_ID_FAILURE,
  LOAD_DEFAULT_WORKSPACE_REQUEST,
  LOAD_DEFAULT_WORKSPACE_SUCCESSED,
  LOAD_DEFAULT_WORKSPACE_FAILURE,
  ADD_WORKSPACE_REQUEST,
  ADD_WORKSPACE_SUCCESSED,
  ADD_WORKSPACE_FAILURE,
  JOIN_WORKSPACE_SUCCESSED,
  JOIN_WORKSPACE_FAILURE,
  JOIN_WORKSPACE_REQUEST,
} from "../reducers/WorkspaceReducer/constants";

export const addWorkspaceByUserId = (requestData) => {
  return function thunk(dispatch, getState) {
    const add = useFetchWorkspace.add;
    dispatch({ type: ADD_WORKSPACE_REQUEST });
    return add(requestData)
      .then((data) => {
        dispatch({ type: ADD_WORKSPACE_SUCCESSED, payload: data });
      })
      .catch((error) => {
        dispatch({ type: ADD_WORKSPACE_FAILURE, payload: error });
      });
  };
};

export const loadWorkspacesByUserId = (id) => {
  return function thunk(dispatch, getState) {
    const getAllByUserId = useFetchWorkspace.getAllByUserId;
    dispatch({ type: LOAD_WORKSPACES_REQUEST });
    return getAllByUserId(id)
      .then((data) => {
        dispatch({ type: LOAD_WORKSPACES_SUCCESSED, payload: data });
      })
      .catch((error) => {
        dispatch({ type: LOAD_WORKSPACES_FAILURE, payload: error });
      });
  };
};
export const loadDefaultWorkspace = (id) => {
  return function thunk(dispatch, getState) {
    const getFirstByUserId = useFetchWorkspace.getFirstByUserId;
    dispatch({ type: LOAD_DEFAULT_WORKSPACE_REQUEST });
    getFirstByUserId(id)
      .then((data) =>
        dispatch({ type: LOAD_DEFAULT_WORKSPACE_SUCCESSED, payload: data })
      )
      .catch((error) =>
        dispatch({ type: LOAD_DEFAULT_WORKSPACE_FAILURE, payload: error })
      );
  };
};

export const loadWorkspaceById = (workspaceId, userId) => {
  return function thunk(dispatch, getState) {
    const getById = useFetchWorkspace.getById;
    dispatch({ type: LOAD_WORKSPACE_BY_ID_REQUEST });
    getById(workspaceId, userId)
      .then((data) => {
        dispatch({ type: LOAD_WORKSPACE_BY_ID_SUCCESSED, payload: data });
      })
      .catch((error) => {
        dispatch({ type: LOAD_WORKSPACE_BY_ID_FAILURE, payload: error });
      });
  };
};

export const joinWorkspaceByUserId = (code, userId) => {
  return function thunk(dispatch, getState) {
    const join = useFetchWorkspace.join;
    dispatch({ type: JOIN_WORKSPACE_REQUEST });
    join(code, userId)
      .then((data) => {
        dispatch({ type: JOIN_WORKSPACE_SUCCESSED, payload: data });
      })
      .catch((error) => {
        dispatch({ type: JOIN_WORKSPACE_FAILURE, payload: error });
      });
  };
};
