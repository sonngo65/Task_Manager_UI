import "./_uploaded-file.scss";
import useUploadFile from "../../customHook/useUploadFile";
import { Link } from "react-router-dom";
export default function UploadedFile({ name, type }) {
  return (
    <Link to={useUploadFile.download(name)}>
      <div className="uploaded-file">
        <img
          src={useUploadFile.load(name)}
          alt={name}
          className="uploaded-file__img"
        />
        <div className="uploaded-file__info">
          <h6>{name}</h6>
          <p>{type}</p>
        </div>
      </div>
    </Link>

    // <div className="uploaded-file">
    //   <div className="uploaded-file__img">
    //     <img src={"../../../images/feedback-3.jpg"} alt={name} />
    //     {/* <img src={useUploadFile.load(name)} alt={name} /> */}
    //   </div>
    //   <div className="uploaed-file__info">
    //     <span>{name}</span>
    //     <span>{type}</span>
    //   </div>
    // </div>
  );
}
