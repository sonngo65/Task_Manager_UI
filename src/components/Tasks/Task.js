import { useEffect, useState } from "react";
import "./_task.scss";

import { Link, useSearchParams } from "react-router-dom";
import Thumbnail from "../commom/Thumbnail";
import useFormatDate from "../../customHook/useFormatDate";
import useFetchUser from "../../customHook/useFetchUser";
import { ProgressBar } from "react-bootstrap";
function Task({
  id,
  content,
  description,
  assignerUploadedFiles,
  startTime,
  endTime,
  assignerId,
  progress,
}) {
  const formatDateTime = useFormatDate();
  const [searchParams, setSearchParams] = useSearchParams();
  const workspaceId = searchParams.get("w");
  const [assigner, setAssigner] = useState({});
  const fetchData = async () => {
    try {
      const tempAssigner = await useFetchUser.getById(assignerId);
      setAssigner(tempAssigner);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Link className="task-link" to={`/task?w=${workspaceId}&t=${id}`}>
      <div className="task">
        <div className="task__head">
          <div className="task__head--left">
            <h5 className="task__title">{content}</h5>
            {/* <p>
              {"Người tạo " +
                assigner.firstName +
                " " +
                assigner.lastName +
                " - "}
              {formatDateTime.customFormatDuration(startTime, endTime) === ""
                ? "now"
                : formatDateTime.customFormatDuration(startTime, endTime) +
                  " ago"}
            </p> */}
          </div>
          <div className="task__head--right">
            {/* <span> bắt đầu {formatDateTime.formatDate(startTime)}</span>
            {" - "}
            <span> đến hạn {formatDateTime.formatDate(endTime)}</span> */}
          </div>
        </div>
        <ProgressBar now={progress} variant="success" label={`${progress}%`} />
        <div className="task__body">
          <div className="task__body__content">
            <p>{description}</p>
          </div>{" "}
          <Thumbnail uploadedFiles={assignerUploadedFiles} />
        </div>
      </div>
    </Link>
  );
}
export default Task;
