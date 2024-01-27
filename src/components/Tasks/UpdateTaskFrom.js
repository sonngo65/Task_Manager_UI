import { useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createTask, updateTaskById } from "../../store/actions/TaskAction";
import "./_task-creation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Select from "../commom/Select";

function UpdateTaskForm({
  updateTaskForm,
  setUpdateTaskForm,
  onClose,
  taskData,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [taskInfo, setTaskInfo] = useState({
    id: taskData.id,
    content: taskData.content,
    description: taskData.description,
  });

  console.log(taskInfo);
  const userId = useSelector((state) => state.user.user.id);
  const workspaceId = useSelector(
    (state) => state.workspace.currentWorkspace.id
  );

  const updateTask = async () => {
    await dispatch(updateTaskById(taskInfo));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTask();
    navigate("/");
  };

  // const handleOnchangeSelect = (values) => {
  //   setTaskInfo((state) => {
  //     return {
  //       ...state,
  //       members: values,
  //     };
  //   });
  // };

  //   const dataSelectInput = useMemo(() => {
  //     if (members) {
  //       return members
  //         .filter((member) => member.id !== userId)
  //         .map((member) => {
  //           return {
  //             value: member,
  //             display: member.firstName + " " + member.lastName,
  //             checked: false,
  //           };
  //         });
  //     }
  //     return {};
  //   }, [members]);

  useEffect(() => {
    onClose(setUpdateTaskForm);
  }, []);

  return (
    <div className={`fullscreen-box  ${updateTaskForm.isShow ? "show" : ""}`}>
      <div className="task-creation">
        <div className="task-creation__head">
          <h5>{updateTaskForm.title}</h5>
          <Link
            onClick={(e) =>
              setUpdateTaskForm((state) => {
                return { ...state, isShow: !state.isShow };
              })
            }
          >
            <FontAwesomeIcon icon={faClose} />
          </Link>
        </div>
        <Form variant={"p-3"}>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="4">
              Content
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                value={taskInfo.content}
                onChange={(e) =>
                  setTaskInfo((state) => {
                    return { ...state, content: e.target.value };
                  })
                }
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="4">
              Description
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                value={taskInfo.description}
                onChange={(e) =>
                  setTaskInfo((state) => {
                    return { ...state, description: e.target.value };
                  })
                }
              />
            </Col>
          </Form.Group>
          {/* <div className="select-input-group">
            <label>Thành viên</label>
            <div className="select-input-group__input">
              {members && (
                <Select
                  onChange={handleOnchangeSelect}
                  objects={members}
                  values={dataSelectInput}
                />
              )}
            </div>
          </div> */}
          <Button variant="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default UpdateTaskForm;
