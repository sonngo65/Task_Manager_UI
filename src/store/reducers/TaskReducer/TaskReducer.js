import {
  LOAD_TASKS_REQUEST,
  LOAD_TASKS_SUCCESSED,
  LOAD_TASKS_FAILURE,
  CREATE_CHILDREN_TASK_REQUEST,
  CREATE_CHILDREN_TASK_SUCCESSED,
  CREATE_CHILDREN_TASK_FAILURE,
  MARK_COMPLETED_TASK_FAILURE,
  MARK_COMPLETED_TASK_SUCCESSED,
  SEND_LESSON_REQUEST,
  SEND_LESSON_SUCCESSED,
  SEND_LESSON_FAILURE,
  DELETE_UPLOADED_FILE_REQUEST,
  DELETE_UPLOADED_FILE_SUCCESSED,
  DELETE_UPLOADED_FILE_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESSED,
  UPDATE_TASK_FAILURE,
  UPDATE_CHILD_TASK_REQUEST,
  UPDATE_CHILD_TASK_SUCCESSED,
  UPDATE_CHILD_TASK_FAILURE,
  DELETE_CHILD_TASK_REQUEST,
  DELETE_CHILD_TASK_SUCCESSED,
  DELETE_CHILD_TASK_FAILURE,
} from "../../constant";
const initialState = {
  currentTask: {},
  childrenTasks: [],
  processing: false,
  error: null,
};

const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TASKS_REQUEST:
      return { ...state, processing: true };
    case LOAD_TASKS_SUCCESSED:
      return {
        ...state,
        processing: false,
        currentTask: action.payload.currentTask,
        childrenTasks: action.payload.childrenTasks,
      };
    case LOAD_TASKS_FAILURE:
      return { ...state, processing: false, error: action.payload.message };

    case UPDATE_TASK_REQUEST:
      return { ...state, processing: true };
    case UPDATE_TASK_SUCCESSED:
      return {
        ...state,
        processing: false,
        currentTask: {
          members: state.currentTask.members,
          ...action.payload,
        },
      };
    case UPDATE_TASK_FAILURE:
      return { ...state, processing: false, error: action.payload.message };

    case CREATE_CHILDREN_TASK_REQUEST:
      return { ...state, processing: true };
    case CREATE_CHILDREN_TASK_SUCCESSED:
      return {
        ...state,
        processing: false,
        childrenTasks: [...state.childrenTasks, action.payload],
      };
    case CREATE_CHILDREN_TASK_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.message,
      };

    case UPDATE_CHILD_TASK_REQUEST:
      return { ...state, processing: true };
    case UPDATE_CHILD_TASK_SUCCESSED:
      return {
        ...state,
        processing: false,
        childrenTasks: state.childrenTasks.map((childTask) => {
          if (childTask.id === action.payload.id) {
            return {
              ...childTask,
              content: action.payload.content,
              description: action.payload.description,
              endTime: action.payload.endTime,
              startTime: action.payload.startTime,
            };
          }
          return childTask;
        }),
      };
    case UPDATE_CHILD_TASK_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.message,
      };
    case DELETE_CHILD_TASK_REQUEST:
      return { ...state, processing: true };
    case DELETE_CHILD_TASK_SUCCESSED:
      return {
        ...state,
        processing: false,
        childrenTasks: state.childrenTasks.filter((childTask) => {
          return childTask.id !== action.payload.id;
        }),
      };
    case DELETE_CHILD_TASK_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.message,
      };

    case MARK_COMPLETED_TASK_FAILURE:
      return {
        ...state,
        processing: true,
      };
    case MARK_COMPLETED_TASK_SUCCESSED:
      return {
        ...state,
        childrenTasks: state.childrenTasks.map((childTask) => {
          if (childTask.id === action.payload.id) {
            return { ...childTask, status: action.payload.status };
          }
          return childTask;
        }),
        processing: false,
      };
    case MARK_COMPLETED_TASK_FAILURE:
      return {
        ...state,
        error: action.payload.message,
        processing: false,
      };
    case SEND_LESSON_REQUEST:
      return {
        ...state,
        processing: true,
      };
    case SEND_LESSON_SUCCESSED:
      //id wrong
      return {
        ...state,
        childrenTasks: state.childrenTasks.map((childTask) => {
          if (childTask.id === action.payload.taskId) {
            return {
              ...childTask,
              memberUploadedFile: action.payload,
              status: action.payload.status,
            };
          }
          return childTask;
        }),
        processing: false,
      };
    case SEND_LESSON_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.message,
      };
    case DELETE_UPLOADED_FILE_REQUEST:
      return {
        ...state,
        processing: true,
      };
    case DELETE_UPLOADED_FILE_SUCCESSED:
      return {
        ...state,
        processing: false,

        childrenTasks: state.childrenTasks.map((childTask) => {
          if (childTask.id === action.payload.taskId) {
            return {
              ...childTask,
              status: action.payload.status,
              memberUploadedFile: {
                ...childTask.memberUploadedFile,
                files: childTask.memberUploadedFile.files.filter(
                  (file) => file.id !== action.payload.id
                ),
              },
            };
          }
          return childTask;
        }),
      };
    case DELETE_UPLOADED_FILE_FAILURE:
      return { ...state, processing: false };
    default:
      return state;
  }
};

export default TaskReducer;
