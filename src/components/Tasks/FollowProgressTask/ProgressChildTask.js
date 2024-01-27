import { Spinner, Table } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import BackIcon from "../../commom/BackIcon/BackIcon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTaskUserByParentTaskIdAndUserId } from "../../../store/actions/TaskUserAction";
import UploadedFilePage from "../../UploadedFile/UploadedFilePage";
import useFormatDate from "../../../customHook/useFormatDate";

export default function ProgressChildTask() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const userId = searchParams.get("u");
  const parentTaskId = searchParams.get("pt");
  const processing = useSelector((state) => state.taskUser.processing);
  const currentTaskUser = useSelector(
    (state) => state.taskUser.currentTaskUser
  );
  const formatDate = useFormatDate();
  useEffect(() => {
    dispatch(getTaskUserByParentTaskIdAndUserId(parentTaskId, userId));
  }, []);
  console.log(currentTaskUser);
  // const user = {
  //   firstName: "ngo",
  //   lastName: "son",
  //   dateOfBirth: "10/10/2002",
  // };
  // const childrenTask = [
  //   {
  //     content: "java 01",
  //     description: "lesson 1",
  //     status: "Completed",
  //     uploadedTime: "10/01/2024",
  //     endTime: "20/12/2002",
  //   },
  //   {
  //     content: "java 01",
  //     description: "lesson 1",
  //     status: "Chưa nộp",
  //     uploadedTime: "10/01/2024",
  //     endTime: "20/12/2002",
  //   },
  //   {
  //     content: "java 01",
  //     description: "lesson 1",
  //     status: "Chưa nộp",
  //     uploadedTime: "10/01/2024",
  //     endTime: "20/12/2002",
  //   },
  // ];
  return processing ? (
    <Spinner animation="border" variant="primary" />
  ) : (
    currentTaskUser && (
      <div className="progress-child-task">
        <BackIcon link={`/follow-progress?t=${parentTaskId}`} />
        <div className="progress-child-task__head">
          <h5>
            Họ tên:{" "}
            {currentTaskUser.user.firstName +
              " " +
              currentTaskUser.user.lastName}
          </h5>
          <p>Ngày sinh: {currentTaskUser.user.dateOfBirth}</p>
        </div>
        <div className="progress-child-task__body">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>Mô tả</th>
                <th>Deadline</th>
                <th>Thời gian nộp</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {currentTaskUser.childrenTask.map((child, index) => {
                console.log(child);
                return (child.status === "Completed" ||
                  child.status === "Overtime") &&
                  child.memberUploadedFile ? (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{child.content} </td>
                    <td>{child.description}</td>
                    <td>{formatDate.formatDate(new Date(child.endTime))}</td>
                    <td>
                      {formatDate.formatDate(
                        new Date(child.memberUploadedFile.uploadedTime)
                      )}
                    </td>

                    <td>
                      <UploadedFilePage
                        status={child.status}
                        uploadedFiles={child.memberUploadedFile.files}
                      />
                      {/* <Link to={"/uploaded-file"}>{child.status} </Link> */}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{child.content} </td>
                    <td>{child.description}</td>
                    <td>{child.endTime}</td>
                    <td>{child.uploadedTime}</td>

                    <td>{child.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    )
  );
}
