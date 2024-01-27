import { Link } from "react-router-dom";
import useUploadFile from "../../customHook/useUploadFile";
import "./_task-uploaded-file.scss";
export default function TaskUploadFile({ name, type }) {
  return (
    <Link className="link-nomal" to={useUploadFile.download(name)}>
      <div className="task-upload-file">
        <img className="task-upload-file__img" src={useUploadFile.load(name)} />
        <div className="task-upload-file__info">
          <h6>{name}</h6>
          <p>{type}</p>
        </div>
      </div>
    </Link>
  );
}
