import {
  LOAD_WORKSPACES_FAILURE,
  LOAD_WORKSPACES_SUCCESSED,
  LOAD_WORKSPACES_REQUEST,
  LOAD_WORKSPACE_BY_ID_REQUEST,
  LOAD_WORKSPACE_BY_ID_SUCCESSED,
  LOAD_WORKSPACE_BY_ID_FAILURE,
  LOAD_DEFAULT_WORKSPACE_REQUEST,
  LOAD_DEFAULT_WORKSPACE_SUCCESSED,
  LOAD_DEFAULT_WORKSPACE_FAILURE,
  CREATE_TASK_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESSED,
  ADD_WORKSPACE_REQUEST,
  ADD_WORKSPACE_SUCCESSED,
  ADD_WORKSPACE_FAILURE,
  JOIN_WORKSPACE_SUCCESSED,
  JOIN_WORKSPACE_REQUEST,
  JOIN_WORKSPACE_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESSED,
  UPDATE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESSED,
  DELETE_TASK_FAILURE,
} from "../../constant";
const initialState = {
  workspaces: [],
  currentWorkspace: {},
  processing: false,
  error: null,
};

const WorkspaceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORKSPACE_REQUEST:
      return { ...state, processing: true };
    case ADD_WORKSPACE_SUCCESSED:
      return {
        ...state,
        workspaces: [
          ...state.workspaces,
          { id: action.payload.id, name: action.payload.name },
        ],

        processing: false,
      };
    case ADD_WORKSPACE_FAILURE:
      return { ...state, error: action.payload.message, processing: false };
    case LOAD_WORKSPACES_REQUEST:
      return { ...state, processing: true };
    case LOAD_WORKSPACES_SUCCESSED:
      return {
        ...state,
        processing: false,
        workspaces: action.payload,
      };
    case LOAD_WORKSPACES_FAILURE:
      return { ...state, processing: false, error: action.payload.message };
    case LOAD_WORKSPACE_BY_ID_REQUEST:
      return { ...state, processing: true };
    case LOAD_WORKSPACE_BY_ID_SUCCESSED:
      return {
        ...state,
        processing: false,
        currentWorkspace: action.payload,
      };
    case LOAD_WORKSPACE_BY_ID_FAILURE:
      return { ...state, processing: false, error: action.payload.message };

    case LOAD_DEFAULT_WORKSPACE_REQUEST:
      return {
        ...state,
        processing: true,
      };
    case LOAD_DEFAULT_WORKSPACE_SUCCESSED:
      return {
        ...state,
        processing: false,
        currentWorkspace: action.payload,
      };
    case LOAD_DEFAULT_WORKSPACE_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.message,
      };
    case CREATE_TASK_REQUEST:
      return {
        ...state,
        processing: true,
      };
    case CREATE_TASK_SUCCESSED:
      return {
        ...state,
        processing: false,
        currentWorkspace: {
          ...state.currentWorkspace,
          tasks: [...state.currentWorkspace.tasks, action.payload],
        },
      };
    case CREATE_TASK_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.message,
      };

    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        processing: true,
      };
    case UPDATE_TASK_SUCCESSED:
      return {
        ...state,
        processing: false,
        currentWorkspace: {
          ...state.currentWorkspace,
          tasks: state.currentWorkspace.tasks.map((task) => {
            if (task.id === action.payload.id) {
              return { ...action.payload, progress: task.progress };
            }
            return task;
          }),
        },
      };
    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.message,
      };
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        processing: true,
      };
    case DELETE_TASK_SUCCESSED:
      return {
        ...state,
        processing: false,
        currentWorkspace: {
          ...state.currentWorkspace,
          tasks: state.currentWorkspace.tasks.filter(
            (task) => task.id !== action.payload.id
          ),
        },
      };
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.message,
      };

    default:
      return state;

    case JOIN_WORKSPACE_REQUEST:
      return {
        ...state,
        processing: true,
      };
    case JOIN_WORKSPACE_SUCCESSED:
      return {
        ...state,
        processing: false,
        workspaces: [...state.workspaces, action.payload],
      };
    case JOIN_WORKSPACE_FAILURE:
      return {
        ...state,
        processing: false,
        error: action.payload.message,
      };
  }
};
export default WorkspaceReducer;
