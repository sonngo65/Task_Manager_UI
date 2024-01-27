import { faClose, faPlus, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { loadTasks } from "../../store/actions/TaskAction";
import "./_children-task-creation.scss";
import ChildrenTaskList from "./ChildrenTask/ChildrenTaskList";
import { loadWorkspaceById } from "../../store/actions/WorkspaceAction";
import CreateChildrenTaskForm from "./CreateChildrenTaskForm";
import useFetchUser from "../../customHook/useFetchUser";
import CustomDropdown from "../commom/CustomDropdown";
import { ROLE_LEADER } from "../../store/constant";
import CreateWorkspaceForm from "../Workplaces/CreateWorkspaceForm";
import CreateTaskForm from "./CreateTaskForm";
import UpdateTaskForm from "./UpdateTaskFrom";
function InnerTaskPage() {
  const [updateTaskForm, setUpdateTaskForm] = useState({
    title: "Update Task",
    isShow: false,
  });
  const dispatch = useDispatch();
  const [isHidden, setIsHidden] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = useSelector((state) => state.user.user.id);
  const role = useSelector(
    (state) => state.workspace.currentWorkspace.roleName
  );
  const childrenTasks = useSelector((state) => state.task.childrenTasks);
  const processing = useSelector((state) => state.task.processing);
  const members = useSelector((state) => state.task.currentTask.members);
  const currentTask = useSelector((state) => state.task.currentTask);
  const currentWorkspaceId = useSelector(
    (state) => state.workspace.currentWorkspace.id
  );
  const taskId = searchParams.get("t");
  const workspaceId = searchParams.get("w");
  const fetchData = async () => {
    if (!currentWorkspaceId) {
      await dispatch(loadWorkspaceById(workspaceId, userId));
    }
    await dispatch(loadTasks(userId, taskId));
  };
  useEffect(() => {
    fetchData();
  }, [userId]);

  const onClose = (setData) => {
    window.addEventListener("click", (e) => {
      var classNames = e.target.className;
      classNames =
        typeof classNames === "string" ? classNames.split(" ") : [""];
      if (classNames[0] === "fullscreen-box") {
        setData((state) => {
          return { ...state, isShow: false };
        });
      }
    });
  };
  console.log(currentTask);
  return (
    <div className="children-task-creation outer">
      <UpdateTaskForm
        updateTaskForm={updateTaskForm}
        setUpdateTaskForm={setUpdateTaskForm}
        taskData={{ ...currentTask, id: taskId }}
        onClose={onClose}
      />
      <div className="children-task-creation__head">
        <div className="children-task-creation__head__icon">
          <Link to={`/?w=${workspaceId}`}>
            <FontAwesomeIcon icon={faClose} />
          </Link>
        </div>
        <div className="children-task-creation__head__title">
          <span>
            <FontAwesomeIcon className="icon" icon={faTasks} />
          </span>
        </div>
        <CustomDropdown members={members} />

        {role === ROLE_LEADER && (
          <>
            <div className="children-task-creation__head__follow-progress">
              <Link to={`/follow-progress/?t=${taskId}`}>Theo dõi tiến độ</Link>
            </div>
            <div className="children-task-creation__head__follow-progress">
              <Link
                onClick={(e) => {
                  setUpdateTaskForm((state) => {
                    return { ...state, isShow: !state.isShow };
                  });
                }}
              >
                Update
              </Link>
            </div>
            <div
              className="children-task-creation__head__add-icon"
              onClick={(e) => {
                setIsHidden((state) => !state);
              }}
            >
              <FontAwesomeIcon className="icon" icon={faPlus} />
            </div>
          </>
        )}
      </div>
      <div className="children-task-creation__body">
        {processing ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          <ChildrenTaskList childrenTasks={childrenTasks} />
        )}
      </div>
      {members && (
        <CreateChildrenTaskForm
          taskId={taskId}
          isHidden={isHidden}
          setIsHidden={setIsHidden}
        />
      )}
    </div>
  );
}
export default InnerTaskPage;
