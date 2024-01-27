import { useDispatch, useSelector } from "react-redux";
import Header from "../layout/Header";
import SideBar from "../SideBar";
import Tasks from "../Tasks";
import "./_home.scss";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadWorkspaceById } from "../../store/actions/WorkspaceAction";
import CreateTaskForm from "../Tasks/CreateTaskForm";
import { createTask } from "../../store/actions/TaskAction";
import CreateWorkspaceForm from "../Workplaces/CreateWorkspaceForm";
import JoinWorkspaceForm from "../Workplaces/JoinWorkspaceForm";

function Home() {
  const dispatch = useDispatch();
  const processing = useSelector((state) => state.workspace.processing);
  console.log(processing);
  const [createTaskForm, setCreateTaskForm] = useState({
    title: "Tạo Task",
    isShow: false,
  });
  const [createWorkspaceForm, setCreateWorkspaceForm] = useState({
    title: "Tạo không gian làm việc",
    isShow: false,
  });
  const [joinWorkspaceForm, setJoinWorkspaceForm] = useState({
    title: "Tham gia không gian làm việc",
    isShow: false,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const urlWorkspaceId = searchParams.get("w");
  const currentWorkspace = useSelector(
    (state) => state.workspace.currentWorkspace
  );
  const currentWorkspaceId = useSelector(
    (state) => state.workspace.currentWorkspace.id
  );
  const userId = useSelector((state) => state.user.user.id);

  const loadCurrentWorkspaceById = async (workspaceId, userId) => {
    await dispatch(loadWorkspaceById(workspaceId, userId));
  };
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

  useEffect(() => {
    if (!currentWorkspaceId) {
      return;
    }
    if (!urlWorkspaceId) {
      setSearchParams({ w: currentWorkspaceId });
      return;
    }
    if (currentWorkspaceId !== parseInt(urlWorkspaceId)) {
      loadCurrentWorkspaceById(urlWorkspaceId, userId);
    }
  }, [currentWorkspaceId, urlWorkspaceId]);
  return (
    <div className="body">
      <Header setJoinWorkspaceForm={setJoinWorkspaceForm} />
      <CreateTaskForm
        createTaskForm={createTaskForm}
        setCreateTaskForm={setCreateTaskForm}
        onClose={onClose}
      />
      <CreateWorkspaceForm
        createWorkspaceForm={createWorkspaceForm}
        setCreateWorkspaceForm={setCreateWorkspaceForm}
        onClose={onClose}
      />
      <JoinWorkspaceForm
        joinWorkspaceForm={joinWorkspaceForm}
        setJoinWorkspaceForm={setJoinWorkspaceForm}
        onClose={onClose}
      />
      <div className="content">
        <Row style={{ margin: "0px" }}>
          <Col style={{ padding: "0px" }} sm="3">
            <SideBar
              code={currentWorkspace.code}
              title={currentWorkspace.name}
              setCreateTaskForm={setCreateTaskForm}
              setCreateWorkspaceForm={setCreateWorkspaceForm}
            />
          </Col>
          <Col style={{ padding: "0px" }}>
            <div className="content__task">
              {processing ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                <Tasks />
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
export default Home;
