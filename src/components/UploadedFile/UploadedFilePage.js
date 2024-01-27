import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadedFile from "./UploadedFile";
import { faArrowLeft, faClose } from "@fortawesome/free-solid-svg-icons";
import "./_uploaded-file.scss";
import { Link } from "react-router-dom";
import BackIcon from "../commom/BackIcon/BackIcon";
import CloseIcon from "../commom/CloseIcon/CloseIcon";
import { useState } from "react";
export default function UploadedFilePage({ status, uploadedFiles }) {
  const [isHidden, setIsHidden] = useState(true);
  // const uploaedFiles = [
  //   {
  //     name: "feedback_4.jpg",
  //     type: "png",
  //   },
  //   {
  //     name: "feedback_4.jpg",
  //     type: "png",
  //   },
  //   {
  //     name: "feedback_4.jpg",
  //     type: "png",
  //   },
  // ];
  const handleOnClose = (e) => {
    setIsHidden((state) => !state);
  };
  console.log(isHidden);
  return (
    <div>
      <span
        style={{
          color: "blue",
          cursor: "pointer",
          textDecoration: "underline",
        }}
        onClick={handleOnClose}
      >
        {status}
      </span>
      <div className={`uploaded-file-page ${isHidden && "hidden"}`}>
        <CloseIcon handleOnClose={handleOnClose} />
        <div>
          {uploadedFiles.map((uploadedFile) => {
            return <UploadedFile {...uploadedFile} />;
          })}
        </div>
      </div>{" "}
    </div>
  );
}
