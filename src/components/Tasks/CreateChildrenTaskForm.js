import { useState } from "react";
import { faClose, faTasks } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Row, Col, Button } from "react-bootstrap";
import CreateChildrenTaskFormLeft from "./CreateChildrenTaskFormLeft";
import CreateChildrenTaskFormRight from "./CreateChildrenTaskFormRight";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createChildrenTask } from "../../store/actions/TaskAction";

import "./_children-task-creation.scss";

function CreateChildrenTaskForm({ taskId, isHidden, setIsHidden }) {
  const [searchParams, setSearchparams] = useSearchParams();
  const dispatch = useDispatch();
  const members = useSelector((state) => state.task.currentTask.members);
  const userId = useSelector((state) => state.user.user.id);
  const workspaceId = useSelector(
    (state) => state.workspace.currentWorkspace.id
  );
  const [taskInfo, setTaskInfo] = useState({
    content: "",
    description: "",
    taskTypeId: "",
    startTime: new Date(),
    endTime: new Date(),
    members: [...members],
    uploadedFiles: [],
    workspaceId: workspaceId,
  });
  console.log(taskInfo);
  const createNewTask = async () => {
    await dispatch(createChildrenTask(taskId, userId, taskInfo));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNewTask();
    setIsHidden((state) => !state);
  };
  return (
    taskId && (
      <div
        className={`children-task-creation full-screen inner ${
          isHidden ? "hidden" : ""
        }`}
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
              <CreateChildrenTaskFormLeft
                taskInfo={taskInfo}
                setTaskInfo={setTaskInfo}
              />

              <Row>
                <div className="btn-box">
                  <Button onClick={handleSubmit}>Tạo</Button>
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
export default CreateChildrenTaskForm;
