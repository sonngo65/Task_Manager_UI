import { useState } from "react";
import { faClose, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Button } from "react-bootstrap";
import CreateChildrenTaskFormLeft from "./CreateChildrenTaskFormLeft";
import CreateChildrenTaskFormRight from "./CreateChildrenTaskFormRight";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createChildrenTask,
  updateChildTaskById,
} from "../../store/actions/TaskAction";

import "./_children-task-creation.scss";
import UpdateChildrenTaskFormLeft from "./UpdateChildrenTaskFormLeft";

function UpdateChildrenTaskForm({
  id,
  content,
  description,
  createdTime,
  startTime,
  endTime,
  taskId,
  isHidden,
  setIsHidden,
  childTask,
}) {
  const [searchParams, setSearchparams] = useSearchParams();
  const dispatch = useDispatch();
  const members = useSelector((state) => state.task.currentTask.members);
  const userId = useSelector((state) => state.user.user.id);
  const workspaceId = useSelector(
    (state) => state.workspace.currentWorkspace.id
  );
  const [taskInfo, setTaskInfo] = useState({
    content: content,
    description: description,
    taskTypeId: "",
    startTime: startTime,
    endTime: endTime,
    members: [...members],
    uploadedFiles: [],
    workspaceId: workspaceId,
  });
  console.log(taskInfo);
  const updateChildTask = async () => {
    await dispatch(updateChildTaskById({ id, ...taskInfo }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateChildTask();
    setIsHidden((state) => !state);
  };
  return (
    taskId && (
      <div
        className={`children-task-creation  inner ${isHidden ? "hidden" : ""}`}
      >
        <div className="children-task-creation__head">
          <div
            className="children-task-creation__head__icon"
            onClick={(e) => {
              setIsHidden((state) => !state);
            }}
          >
            <FontAwesomeIcon icon={faClose} />
          </div>
          <div className="children-task-creation__head__title">
            <span>
              <FontAwesomeIcon className="icon" icon={faTasks} />
            </span>
            Create New Task
          </div>
          <div></div>
        </div>
        <div className="children-task-creation__body">
          <Row style={{ height: "100%" }}>
            <Col xs="8">
              <UpdateChildrenTaskFormLeft
                taskInfo={taskInfo}
                setTaskInfo={setTaskInfo}
              />

              <Row>
                <div className="btn-box">
                  <Button onClick={handleSubmit}>Update</Button>
                </div>
              </Row>
            </Col>
            <Col>
              <CreateChildrenTaskFormRight
                taskInfo={taskInfo}
                setTaskInfo={setTaskInfo}
              />
            </Col>
          </Row>
        </div>
      </div>
    )
  );
}
export default UpdateChildrenTaskForm;
