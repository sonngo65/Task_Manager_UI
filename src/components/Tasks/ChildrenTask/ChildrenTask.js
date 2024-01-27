import { Link } from "react-router-dom";
import "./_children-task.scss";
import InnerChildTaskPage from "./InnerChildTaskPage";
import { useState } from "react";
import useFormatDate from "../../../customHook/useFormatDate";
export default function ChildrenTask({ childrenTask }) {
  const [isHidden, setIsHidden] = useState(true);
  const formatDateTime = useFormatDate();
  console.log(childrenTask);
  return (
    <>
      <div
        className={`children-task ${
          childrenTask.status === "Completed" ? "completed" : ""
        }`}
        onClick={() => setIsHidden((state) => !state)}
      >
        <div className="children-task__left">
          <div className="children-task__head">
            <h5>{childrenTask.content}</h5>
          </div>
          <div className="children-task__time">
            <span className="start-time">
              {formatDateTime.formatDate(childrenTask.startTime)}
            </span>
            -
            <span className="end-time">
              {formatDateTime.formatDate(childrenTask.endTime)}
            </span>
          </div>
        </div>
        <div className="children-task_right">
          <span
            className={`${
              childrenTask.status === "Complete"
                ? "completed"
                : childrenTask.status === "Overtime"
                ? "overtime"
                : ""
            }`}
          >
            {childrenTask.status}
          </span>
        </div>
      </div>

      <InnerChildTaskPage
        {...childrenTask}
        setIsHidden={setIsHidden}
        isHidden={isHidden}
      />
    </>
  );
}
