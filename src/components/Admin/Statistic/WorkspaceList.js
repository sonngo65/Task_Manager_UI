import { useDispatch } from "react-redux";
import { getAdminTasksByWorkspaceIdAndUserId } from "../../../store/actions/AdminAction";

export default function WorkspaceList({ userId, workspaces, isHidden }) {
  const dispatch = useDispatch();
  const handleClickWorkspace = (workspaceId, userId) => {
    dispatch(getAdminTasksByWorkspaceIdAndUserId(workspaceId, userId));
  };
  return (
    workspaces && (
      <ul
        style={{ height: `${workspaces.length * 30}px` }}
        className={`workspace-list ${isHidden ? "hidden" : ""}`}
      >
        {workspaces.map((workspace) => (
          <li
            onClick={(e) => {
              handleClickWorkspace(workspace.id, userId);
            }}
            className="workspace-item"
          >
            {workspace.name}
          </li>
        ))}
      </ul>
    )
  );
}
