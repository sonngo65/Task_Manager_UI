import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../Tasks/_task-creation.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { joinWorkspaceByUserId } from "../../store/actions/WorkspaceAction";
function JoinWorkspaceForm({
  joinWorkspaceForm,
  setJoinWorkspaceForm,
  onClose,
}) {
  const dispatch = useDispatch();
  const [joinWorkspaceInfo, setJoinWorkspaceInfo] = useState({
    code: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const userId = useSelector((state) => state.user.user.id);
  const joinWorkspace = async (code, userId) => {
    await dispatch(joinWorkspaceByUserId(code, userId));
  };
  const handleSubmit = async (e) => {
    await joinWorkspace(joinWorkspaceInfo.code, userId);
    e.preventDefault();
  };
  useEffect(() => {
    onClose(setJoinWorkspaceForm);
  }, []);
  return (
    <div
      className={`fullscreen-box  ${joinWorkspaceForm.isShow ? "show" : ""}`}
    >
      <div className="task-creation">
        <div className="task-creation__head">
          <h5>{joinWorkspaceForm.title}</h5>
          <Link
            onClick={(e) =>
              setJoinWorkspaceForm((state) => {
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
              Code
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="text"
                onChange={(e) =>
                  setJoinWorkspaceInfo((state) => {
                    return { ...state, code: e.target.value };
                  })
                }
              />
            </Col>
          </Form.Group>

          <Button variant="primary" onClick={handleSubmit}>
            Join
          </Button>
        </Form>
      </div>
    </div>
  );
}
export default JoinWorkspaceForm;
