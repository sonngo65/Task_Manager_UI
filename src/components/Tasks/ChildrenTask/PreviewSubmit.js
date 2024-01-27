import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteFileInLesson } from "../../../store/actions/TaskAction";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./_preview-submit.scss";
export default function PreviewSubmit({ files, setUploadFile, status }) {
  const dispatch = useDispatch();
  const removeUploadedFile = (id) => {
    dispatch(deleteFileInLesson(id));
  };
  useEffect(() => {}, []);
  const handleRemoveUploadedFile = (id, index) => {
    return (e) => {
      if (id) {
        removeUploadedFile(id);
      } else {
        setUploadFile((state) => {
          return {
            ...state,
            previewUploadedFiles: state.previewUploadedFiles.filter(
              (value, i) => i !== index
            ),
            uploadedFiles: state.uploadedFiles.filter(
              (value, i) => i !== index
            ),
            isUploaded: state.previewUploadedFiles.length > 1,
          };
        });
      }
    };
  };
  return (
    files.length > 0 && (
      <div className="preview-input">
        {files.map((file, index) => (
          <div className="preview-input-item">
            <img className="input-img" src={file.source} />
            <div className="input-info">
              <h6>{file.name}</h6>
              <p>{file.type}</p>
            </div>
            {status !== "Completed" && (
              <div
                className="input-close"
                onClick={handleRemoveUploadedFile(file.id, index)}
              >
                <FontAwesomeIcon icon={faClose} />
              </div>
            )}
          </div>
        ))}
      </div>
    )
  );
}
