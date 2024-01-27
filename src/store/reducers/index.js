import { combineReducers } from "redux";
import UserReducer from "./UserReducer/UserReducer";
import WorkspaceReducer from "./WorkspaceReducer/WorkspaceReducer";
import TaskReducer from "./TaskReducer/TaskReducer";
import TaskUserReducer from "./TaskUserReducer/TaskUserReducer";
import AdminReducer from "./AdminReducer/AdminReducer";
const rootReducer = combineReducers({
  user: UserReducer,
  workspace: WorkspaceReducer,
  task: TaskReducer,
  taskUser: TaskUserReducer,
  admin: AdminReducer,
});
export default rootReducer;
