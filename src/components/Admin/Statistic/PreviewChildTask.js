import { upload } from "@testing-library/user-event/dist/upload";
import TaskUploadFile from "../../UploadedFile/TaskUploadFile";
import UploadedFile from "../../UploadedFile/UploadedFile";
import "./_preview-child-task.scss";
export default function PreviewChildTask({
  content,
  description,
  endTime,
  createdTime,
  assignerUploadedFiles,
  memberUploadedFile,
}) {
  return (
    <div className="preview-child-task">
      <div className="preview-child-task__head">
        <div className="head-left">
          <h5>{content}</h5>
        </div>
        <div className="head-right">
          <span>{createdTime}</span>
          <span> - </span>
          <span>{endTime}</span>
        </div>
      </div>
      <div className="preview-child-task__body">
        <p>{description}</p>
        {assignerUploadedFiles &&
          assignerUploadedFiles.map((assignerUploadedFile) => (
            <TaskUploadFile {...assignerUploadedFile} />
          ))}
      </div>
      {memberUploadedFile && (
        <div className="preview-child-task__member-upload">
          <div className="uploaded-files">
            {memberUploadedFile.files.map((file) => (
              <UploadedFile {...file} />
            ))}
          </div>
          <div className="uploaded-time">{memberUploadedFile.uploadedTime}</div>
        </div>
      )}
    </div>
  );
}
