import {
  ADD_ADMIN_USER,
  DELETE_ADMIN_USERS_FAILURE,
  DELETE_ADMIN_USERS_REQUEST,
  DELETE_ADMIN_USERS_SUCCESSED,
  LOAD_ADMIN_TASKS_FAILURE,
  LOAD_ADMIN_TASKS_REQUEST,
  LOAD_ADMIN_TASKS_SUCCESSED,
  LOAD_ADMIN_USERS_FAILURE,
  LOAD_ADMIN_USERS_REQUEST,
  LOAD_ADMIN_USERS_SUCCESSED,
  LOAD_ADMIN_WORKSPACES_FAILURE,
  LOAD_ADMIN_WORKSPACES_REQUEST,
  LOAD_ADMIN_WORKSPACES_SUCCESSED,
  LOAD_TASK_STATISTIC_FAILURE,
  LOAD_TASK_STATISTIC_REQUEST,
  LOAD_TASK_STATISTIC_SUCCESSED,
  SET_ADMIN_IS_CHANGED_USER,
  SET_ADMIN_IS_CHOICE_USER,
  SET_ADMIN_USER,
  UPDATE_OR_ADD_ADMIN_USERS_FAILURE,
  UPDATE_OR_ADD_ADMIN_USERS_REQUEST,
  UPDATE_OR_ADD_ADMIN_USERS_SUCCESSED,
} from "../../constant";

const initialState = {
  users: [],
  workspaces: [],
  tasks: {
    list: null,
    statistic: null,
  },
  processing: false,
  error: null,
};
const AdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ADMIN_TASKS_REQUEST:
      return { ...state, processing: true };
    case LOAD_ADMIN_TASKS_SUCCESSED:
      return {
        ...state,
        tasks: {
          list: action.payload.list,
          statistic:
            action.payload.statistic === undefined
              ? state.tasks.statistic
              : action.payload.statistic,
          roleName: action.payload.roleName,
        },
        processing: false,
      };

    case LOAD_ADMIN_TASKS_FAILURE:
      return { ...state, processing: false, error: action.payload.message };
    case LOAD_ADMIN_USERS_REQUEST:
      return { ...state, processing: true };
    case LOAD_ADMIN_USERS_SUCCESSED:
      return {
        ...state,
        processing: false,
        users: action.payload
          ? action.payload.map((user) => {
              return { ...user, isChanged: false, isChoice: false };
            })
          : [],
      };
    case LOAD_ADMIN_USERS_FAILURE:
      return { ...state, processing: false, error: action.payload.message };
    case LOAD_ADMIN_WORKSPACES_REQUEST:
      return { ...state, processing: true };
    case LOAD_ADMIN_WORKSPACES_SUCCESSED:
      return { ...state, processing: false, workspaces: action.payload };
    case LOAD_ADMIN_WORKSPACES_FAILURE:
      return { ...state, processing: false, error: action.payload.message };
    case SET_ADMIN_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload.currentState.id) {
            return {
              ...user,
              [`${action.payload.valueName}`]: action.payload.value,
              isChanged: true,
            };
          }
          return user;
        }),
      };

    case ADD_ADMIN_USER:
      return {
        ...state,
        users: [
          ...state.users,
          {
            id: "new" + state.users.length,
            isNew: true,
            isChanged: false,
            isChoice: false,
          },
        ],
      };

    case SET_ADMIN_IS_CHOICE_USER:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload)
            return { ...user, isChoice: !user.isChoice };
          return user;
        }),
      };

    case UPDATE_OR_ADD_ADMIN_USERS_REQUEST:
      return { ...state, processing: true };

    case UPDATE_OR_ADD_ADMIN_USERS_SUCCESSED:
      return {
        ...state,
        processing: false,
        users: state.users.map((user) => {
          if (user.isChanged) {
            return action.payload.shift();
          }
          return user;
        }),
      };
    case UPDATE_OR_ADD_ADMIN_USERS_FAILURE:
      return { ...state, processing: false, error: action.payload.message };

    case DELETE_ADMIN_USERS_REQUEST:
      return { ...state, processing: true };
    case DELETE_ADMIN_USERS_SUCCESSED:
      return {
        ...state,
        processing: false,
        users: [...state.users.filter((user) => !user.isChoice)],
      };
    case DELETE_ADMIN_USERS_FAILURE:
      return { ...state, processing: false, error: action.payload.message };

    default:
      return state;
  }
};
export default AdminReducer;
