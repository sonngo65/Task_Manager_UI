import { faClose, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useSearchParams } from "react-router-dom";
import ProgressTaskUser from "./ProgressTaskUser";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllTaskUserByTaskId } from "../../../store/actions/TaskUserAction";
import { Spinner } from "react-bootstrap";
export default function () {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = useSelector((state) => state.user.user.id);
  const taskUsers = useSelector((state) => state.taskUser.taskUsers);
  const taskId = searchParams.get("t");
  const processing = useSelector((state) => state.taskUser.processing);
  console.log(taskId);
  useEffect(() => {
    dispatch(getAllTaskUserByTaskId(taskId));
  }, []);
  console.log(taskUsers);
  const workspaceId = 1;
  // const taskUsers = [
  //   {
  //     id: 1,
  //     firstName: "nguyen",
  //     lastName: "son",
  //     progress: 100,
  //     completedTime: null,
  //   },
  //   {
  //     id: 12,
  //     firstName: "nguyen",
  //     lastName: "10",
  //     progress: 50,
  //     completedTime: null,
  //   },
  //   {
  //     id: 13,
  //     firstName: "nguyen",
  //     lastName: "son",
  //     progress: 40,
  //     completedTime: null,
  //   },
  // ];
  return (
    <div className="children-task-creation outer">
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
      </div>
      <div className="children-task-creation__body">
        {processing ? (
          <Spinner animation="border" variant="primary" />
        ) : (
          taskUsers &&
          taskUsers.map((taskUser) => (
            <ProgressTaskUser
              {...taskUser}
              parentTaskId={taskId}
              userId={taskUser.userId}
            />
          ))
        )}
      </div>
    </div>
  );
}
