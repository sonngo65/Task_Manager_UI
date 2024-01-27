import { Link } from "react-router-dom";
import "../_children-task-creation.scss";
import "./_children-task-info.scss";
import "./_submit-lesson.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faPlus, faTasks } from "@fortawesome/free-solid-svg-icons";
import { Col, Container, Row } from "react-bootstrap";
import useFormatDate from "../../../customHook/useFormatDate";
import useFetchUser from "../../../customHook/useFetchUser";
import {
  getStatusTask,
  updateStatusTask,
} from "../../../store/actions/TaskAction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUploadFile from "../../../customHook/useUploadFile";
import { sendLesson } from "../../../store/actions/TaskAction";
import PreviewSubmit from "./PreviewSubmit";
import { set } from "date-fns";
import TaskUploadFile from "../../UploadedFile/TaskUploadFile";
import CreateChildrenTaskForm from "../CreateChildrenTaskForm";
import UpdateChildrenTaskForm from "../UpdateChildrenTaskForm";
import { ROLE_LEADER } from "../../../store/constant";
export default function InnerChildTaskPage({
  id,
  content,
  description,
  createdTime,
  assignerId,
  startTime,
  endTime,
  isHidden,
  setIsHidden,
  status,
  assignerUploadedFiles,
  memberUploadedFile,
}) {
  const dispatch = useDispatch();
  const role = useSelector(
    (state) => state.workspace.currentWorkspace.roleName
  );
  const userId = useSelector((state) => state.user.user.id);
  const [assignerData, setAssignerData] = useState({
    assigner: {},
    error: null,
  });
  const files = memberUploadedFile
    ? memberUploadedFile.files.map((file) => {
        return {
          ...file,
          source: useUploadFile.load(file.name),
        };
      })
    : [];
  const taskUploadedFiles = assignerUploadedFiles;
  const [uploadFile, setUploadFile] = useState({
    uploadedFiles: [],
    previewUploadedFiles: [...files],
    isUploaded:
      memberUploadedFile !== null && memberUploadedFile.files.length > 0,
  });
  const formatDateTime = useFormatDate();

  //-------------------------------
  //Fetch Data
  //-------------------------------

  const fetchData = async () => {
    try {
      const assigner = await useFetchUser.getById(assignerId);
      setAssignerData((state) => {
        return { ...state, assigner };
      });
    } catch (e) {
      const error = e.message;
      setAssignerData((state) => {
        return { ...state, error };
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  //-------------------------------
  //Handle DOM event
  //-------------------------------
  const completeTask = async (childTask) => {
    await dispatch(updateStatusTask(childTask, userId, 1));
  };
  const cancelCompleteTask = async (childTask) => {
    await dispatch(updateStatusTask(childTask, userId, 2));
  };
  // const loadStatus = async (id) => {
  //   await dispatch(getStatusTask(id, userId));
  // };
  const handleCompleteTask = (e) => {
    completeTask(id);
  };
  const handleCancelCompleteTask = (e) => {
    cancelCompleteTask(id);
  };
  const submitLesson = async (uploadedFile, userId, taskId) => {
    await dispatch(sendLesson(uploadedFile, userId, taskId));
  };
  const handleSubmitLesson = (e) => {
    submitLesson({ files: [...uploadFile.uploadedFiles] }, userId, id);
  };

  const handleUploadFile = async (e) => {
    var data = new FormData();
    let previewUploadedFiles = [];
    let uploadedFiles = [];
    for (var file of e.target.files) {
      data.append("file", file);
      previewUploadedFiles.push({
        source: URL.createObjectURL(file),
        name: file.name,
        type: file.type,
      });
      uploadedFiles.push({
        name: file.name,
        type: file.type,
      });
    }
    setUploadFile((state) => {
      return {
        ...state,
        uploadedFiles: uploadedFiles,
        previewUploadedFiles: [
          ...state.previewUploadedFiles,
          ...previewUploadedFiles,
        ],
      };
    });
    try {
      await useUploadFile.upload(data);
      setUploadFile((state) => {
        return { ...state, isUploaded: true };
      });
    } catch (e) {}
  };
  useEffect(() => {
    setUploadFile((state) => {
      return {
        ...state,
        previewUploadedFiles: [...files],
        isUploaded: files.length > 0,
      };
    });
  }, [memberUploadedFile]);
  const [isHiddenUpdate, setIsHiddenUpdate] = useState(true);
  return (
    <div className={`children-task-creation inner ${isHidden ? "hidden" : ""}`}>
      <UpdateChildrenTaskForm
        id={id}
        content={content}
        description={description}
        createdTime={createdTime}
        startTime={startTime}
        endTime={endTime}
        isHidden={isHiddenUpdate}
        setIsHidden={setIsHiddenUpdate}
        taskId={id}
      />
      <div className="children-task-creation__head">
        <div
          className="children-task-creation__head__icon"
          onClick={() => setIsHidden((state) => !state)}
        >
          <FontAwesomeIcon icon={faClose} />
        </div>
        <div className="children-task-creation__head__title">
          <span>
            <FontAwesomeIcon className="icon" icon={faTasks} />
          </span>
          Children Task
        </div>
        {role === ROLE_LEADER && (
          <div className="children-task-creation__head__update-child-task">
            <Link
              onClick={(e) => {
                setIsHiddenUpdate((state) => !state);
              }}
            >
              Update
            </Link>
            <Link
              onClick={(e) => {
                setIsHiddenUpdate((state) => !state);
              }}
            >
              Delete
            </Link>
          </div>
        )}
      </div>
      <div className="children-task-creation__body">
        <Container>
          <Row style={{ height: "100%" }}>
            <Col xs="8">
              <div className="children-task-info">
                <div className="children-task-info__head">
                  <h5>{content}</h5>
                  {assignerData.error === null && (
                    <span>
                      {assignerData.assigner.firstName}{" "}
                      {assignerData.assigner.lastName} -{" "}
                    </span>
                  )}
                  <span>{formatDateTime.formatDate(createdTime)}</span>
                </div>

                <div className="children-task-info__body">
                  <p>{description}</p>
                  <div className="task-uploaded-files">
                    {taskUploadedFiles &&
                      taskUploadedFiles.map((taskUploadedFile) => {
                        return <TaskUploadFile {...taskUploadedFile} />;
                      })}
                  </div>
                </div>
              </div>
            </Col>
            <Col>
              <div className="submit-lesson">
                <div className="submit-lesson__head">
                  <h5 className="submit-lesson__head-title">
                    Bài tập của bạn{" "}
                  </h5>
                  <span
                    className={`submit-lesson__head-status ${
                      status === "Complete"
                        ? "completed"
                        : status === "Overtime"
                        ? "overtime"
                        : ""
                    }`}
                  >
                    {status}
                  </span>
                </div>

                <div className="submit-lesson__body">
                  <PreviewSubmit
                    status={status}
                    files={uploadFile.previewUploadedFiles}
                    setUploadFile={setUploadFile}
                  />

                  <div className="file-input-box">
                    {status !== "Completed" && (
                      <label for={`file-input-${id}`}>
                        <FontAwesomeIcon icon={faPlus} /> Thêm hoặc tạo
                      </label>
                    )}
                  </div>

                  <input
                    type="file"
                    className="file-input"
                    id={`file-input-${id}`}
                    onChange={handleUploadFile}
                  />
                </div>

                <div className="submit-lesson__btn">
                  {status === "Completed" || status === "Overtime" ? (
                    <button
                      className="submited"
                      onClick={handleCancelCompleteTask}
                    >
                      hủy nộp bài
                    </button>
                  ) : uploadFile.isUploaded ? (
                    <button className="submited" onClick={handleSubmitLesson}>
                      nộp bài
                    </button>
                  ) : (
                    <button onClick={handleCompleteTask}>
                      Đánh dấu là đã hoàn thành
                    </button>
                  )}
                  {}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
