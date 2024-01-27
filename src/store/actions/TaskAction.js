import { upload } from "@testing-library/user-event/dist/upload";
import useFetchTask from "../../customHook/useFetchTask";
import {
  LOAD_TASKS_REQUEST,
  LOAD_TASKS_SUCCESSED,
  LOAD_TASKS_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESSED,
  CREATE_TASK_FAILURE,
  CREATE_CHILDREN_TASK_SUCCESSED,
  CREATE_CHILDREN_TASK_REQUEST,
  CREATE_CHILDREN_TASK_FAILURE,
  MARK_COMPLETED_TASK_REQUEST,
  MARK_COMPLETED_TASK_SUCCESSED,
  MARK_COMPLETED_TASK_FAILURE,
  SEND_LESSON_REQUEST,
  SEND_LESSON_SUCCESSED,
  SEND_LESSON_FAILURE,
  DELETE_UPLOADED_FILE_REQUEST,
  DELETE_UPLOADED_FILE_SUCCESSED,
  DELETE_UPLOADED_FILE_FAILURE,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_SUCCESSED,
  UPDATE_TASK_REQUEST,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESSED,
  DELETE_TASK_FAILURE,
  UPDATE_CHILD_TASK_REQUEST,
  UPDATE_CHILD_TASK_SUCCESSED,
  UPDATE_CHILD_TASK_FAILURE,
  DELETE_CHILD_TASK_REQUEST,
  DELETE_CHILD_TASK_SUCCESSED,
  DELETE_CHILD_TASK_FAILURE,
} from "../reducers/TaskReducer/constants";
export const loadTasks = (userId, parentTaskId) => {
  return async function thunk(dispatch, getState) {
    const getById = useFetchTask.getById;
    const getAllByParentId = useFetchTask.getAllByParentId;
    dispatch({ type: LOAD_TASKS_REQUEST });
    try {
      const childrenTasks = await getAllByParentId(userId, parentTaskId);
      const currentTask = await getById(parentTaskId);
      dispatch({
        type: LOAD_TASKS_SUCCESSED,
        payload: { currentTask, childrenTasks },
      });
    } catch (error) {
      dispatch({
        type: LOAD_TASKS_FAILURE,
        payload: error,
      });
    }
  };
};

export const createTask = (userId, workspace, taskInfo) => {
  return function thunk(dispatch, getState) {
    const post = useFetchTask.post;
    dispatch({ type: CREATE_TASK_REQUEST });
    post(userId, workspace, taskInfo)
      .then((data) => dispatch({ type: CREATE_TASK_SUCCESSED, payload: data }))
      .catch((error) =>
        dispatch({ type: CREATE_TASK_FAILURE, payload: error })
      );
  };
};

export const createChildrenTask = (parentTaskId, assignerId, taskInfo) => {
  return function thunk(dispatch, getState) {
    const postByParentId = useFetchTask.postByParentId;
    dispatch({ type: CREATE_CHILDREN_TASK_REQUEST });
    return postByParentId(parentTaskId, assignerId, taskInfo)
      .then((data) =>
        dispatch({ type: CREATE_CHILDREN_TASK_SUCCESSED, payload: data })
      )
      .then((error) =>
        dispatch({ type: CREATE_CHILDREN_TASK_FAILURE, payload: error })
      );
  };
};
export const updateStatusTask = (childTaskId, userId, statusId) => {
  return function thunk(dispatch, getState) {
    const updateStatusTaskById = useFetchTask.updateStatusTaskById;
    dispatch({ type: MARK_COMPLETED_TASK_REQUEST });
    updateStatusTaskById(childTaskId, userId, statusId)
      .then((data) =>
        dispatch({ type: MARK_COMPLETED_TASK_SUCCESSED, payload: data })
      )
      .catch((error) =>
        dispatch({ type: MARK_COMPLETED_TASK_FAILURE, payload: error })
      );
  };
};
export const getStatusTask = (taskId, userId) => {
  return function thunk(dispatch, getState) {
    const getStatusTaskById = useFetchTask.getStatusTaskById;
    dispatch({ type: MARK_COMPLETED_TASK_REQUEST });
    return getStatusTaskById(taskId, userId)
      .then((data) =>
        dispatch({ type: MARK_COMPLETED_TASK_SUCCESSED, payload: data })
      )
      .catch((error) =>
        dispatch({ type: MARK_COMPLETED_TASK_FAILURE, payload: error })
      );
  };
};
export const sendLesson = (uploadedFile, userId, taskId) => {
  return function thunk(dispatch, getState) {
    const uploadFile = useFetchTask.uploadFile;
    dispatch({ type: SEND_LESSON_REQUEST });
    uploadFile(uploadedFile, userId, taskId)
      .then((data) => dispatch({ type: SEND_LESSON_SUCCESSED, payload: data }))
      .catch((error) =>
        dispatch({ type: SEND_LESSON_FAILURE, payload: error })
      );
  };
};
export const deleteFileInLesson = (id) => {
  return function thunk(dispatch, getState) {
    const removeFile = useFetchTask.removeFile;
    dispatch({ type: DELETE_UPLOADED_FILE_REQUEST });
    removeFile(id)
      .then((data) => {
        dispatch({ type: DELETE_UPLOADED_FILE_SUCCESSED, payload: data });
      })
      .catch((error) =>
        dispatch({ type: DELETE_UPLOADED_FILE_FAILURE, payload: error })
      );
  };
};

export const updateTaskById = (task) => {
  return function thunk(dispatch, getState) {
    const updateTask = useFetchTask.updateTask;
    dispatch({ type: UPDATE_TASK_REQUEST });
    updateTask(task)
      .then((data) => {
        dispatch({ type: UPDATE_TASK_SUCCESSED, payload: data });
      })
      .catch((error) =>
        dispatch({ type: UPDATE_TASK_FAILURE, payload: error })
      );
  };
};
export const deleteTaskById = (id) => {
  return function thunk(dispatch, getState) {
    const deleteTask = useFetchTask.deleteTask;
    dispatch({ type: DELETE_TASK_REQUEST });
    deleteTask(id)
      .then((data) => {
        dispatch({ type: DELETE_TASK_SUCCESSED, payload: data });
      })
      .catch((error) =>
        dispatch({ type: DELETE_TASK_FAILURE, payload: error })
      );
  };
};

export const updateChildTaskById = (task) => {
  return function thunk(dispatch, getState) {
    const updateTask = useFetchTask.updateTask;
    dispatch({ type: UPDATE_CHILD_TASK_REQUEST });
    updateTask(task)
      .then((data) => {
        dispatch({ type: UPDATE_CHILD_TASK_SUCCESSED, payload: data });
      })
      .catch((error) =>
        dispatch({ type: UPDATE_CHILD_TASK_FAILURE, payload: error })
      );
  };
};
export const deleteChildTaskById = (id) => {
  return function thunk(dispatch, getState) {
    const deleteTask = useFetchTask.deleteTask;
    dispatch({ type: DELETE_CHILD_TASK_REQUEST });
    deleteTask(id)
      .then((data) => {
        dispatch({ type: DELETE_CHILD_TASK_SUCCESSED, payload: data });
      })
      .catch((error) =>
        dispatch({ type: DELETE_CHILD_TASK_FAILURE, payload: error })
      );
  };
};
