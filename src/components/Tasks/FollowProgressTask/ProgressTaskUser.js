import { ProgressBar } from "react-bootstrap";
import "./_follow-progress.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function ProgressTaskUser({
  id,
  progress,
  firstName,
  lastName,
  completedTime,
  userId,
  parentTaskId,
}) {
  return (
    <Link to={`/progress-child-task/?pt=${parentTaskId}&u=${userId}`}>
      <div className={`progress-task ${progress === 100 ? "completed" : ""}`}>
        <span className="progress-task__status">
          {progress === 100 ? "Hoàn thành" : "Chưa hoàn thành"}
        </span>
        <span className="progress-task__name">
          {firstName + " " + lastName}
        </span>
        <ProgressBar
          striped
          variant={progress === 100 ? "success" : "info"}
          now={progress}
          label={`${progress}%`}
        />
      </div>
    </Link>
  );
}
