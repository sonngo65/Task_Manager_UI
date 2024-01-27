import {
  LOAD_TASK_USERS_FAILURE,
  LOAD_TASK_USERS_REQUEST,
  LOAD_TASK_USERS_SUCCESSED,
  LOAD_TASK_USER_FAILURE,
  LOAD_TASK_USER_REQUEST,
  LOAD_TASK_USER_SUCCESSED,
} from "../../constant";

const initialState = {
  taskUsers: [],
  currentTaskUser: null,
  processing: false,
  error: null,
};
const TaskUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TASK_USERS_REQUEST:
      return {
        ...state,
        processing: true,
      };
    case LOAD_TASK_USERS_SUCCESSED:
      return {
        ...state,
        processing: false,
        taskUsers: action.payload,
      };
    case LOAD_TASK_USERS_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.message,
      };
    case LOAD_TASK_USER_REQUEST:
      return {
        ...state,
        processing: true,
      };
    case LOAD_TASK_USER_SUCCESSED:
      return {
        ...state,
        processing: false,
        currentTaskUser: action.payload,
      };
    case LOAD_TASK_USER_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};
export default TaskUserReducer;
