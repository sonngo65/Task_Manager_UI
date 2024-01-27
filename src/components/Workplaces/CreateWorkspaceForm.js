import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { createTask } from "../../store/actions/TaskAction";
import "../Tasks/_task-creation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Select from "../commom/Select";
import { addWorkspaceByUserId } from "../../store/actions/WorkspaceAction";
function CreateWorkspaceForm({
  createWorkspaceForm,
  setCreateWorkspaceForm,
  onClose,
}) {
  const dispatch = useDispatch();
  const [workspaceInfo, setWorkspaceInfo] = useState({
    name: "",
  });
  const userId = useSelector((state) => state.user.user.id);

  const createNewWorkspace = async () => {
    await dispatch(addWorkspaceByUserId({ ...workspaceInfo, userId }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createNewWorkspace();
  };
  useEffect(() => {
    onClose(setCreateWorkspaceForm);
  }, []);
  return (
    <div
      className={`fullscreen-box  ${createWorkspaceForm.isShow ? "show" : ""}`}
    >
      <div className="task-creation">
        <div className="task-creation__head">
          <h5>{createWorkspaceForm.title}</h5>
          <Link
            onClick={(e) =>
              setCreateWorkspaceForm((state) => {
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
              Name
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                onChange={(e) =>
                  setWorkspaceInfo((state) => {
                    return { ...state, name: e.target.value };
                  })
                }
              />
            </Col>
          </Form.Group>

          <Button variant="primary" onClick={handleSubmit}>
            Tao
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default CreateWorkspaceForm;
