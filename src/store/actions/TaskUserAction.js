import { da } from "date-fns/locale";
import useFetchTaskUser from "../../customHook/useFetchTaskUser";
import {
  LOAD_TASK_USERS_FAILURE,
  LOAD_TASK_USERS_REQUEST,
  LOAD_TASK_USERS_SUCCESSED,
  LOAD_TASK_USER_FAILURE,
  LOAD_TASK_USER_REQUEST,
  LOAD_TASK_USER_SUCCESSED,
} from "../reducers/TaskUserReducer/constants";
export const getTaskUserByParentTaskIdAndUserId = (parentTaskId, userId) => {
  return function thunk(dispatch, getState) {
    const getByParentTaskIdAndUserId =
      useFetchTaskUser.getByParentTaskIdAndUserId;
    dispatch({ type: LOAD_TASK_USER_REQUEST });
    getByParentTaskIdAndUserId(parentTaskId, userId)
      .then((data) =>
        dispatch({ type: LOAD_TASK_USER_SUCCESSED, payload: data })
      )
      .catch((error) =>
        dispatch({ type: LOAD_TASK_USER_FAILURE, payload: error })
      );
  };
};
export const getAllTaskUserByTaskId = (taskId) => {
  return function thunk(dispatch, getState) {
    const getAllByTaskId = useFetchTaskUser.getAllByTaskId;
    dispatch({ type: LOAD_TASK_USERS_REQUEST });
    getAllByTaskId(taskId)
      .then((data) =>
        dispatch({ type: LOAD_TASK_USERS_SUCCESSED, payload: data })
      )
      .catch((error) =>
        dispatch({ type: LOAD_TASK_USERS_FAILURE, payload: error })
      );
  };
};
