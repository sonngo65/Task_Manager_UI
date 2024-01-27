import useUploadFile from "../../customHook/useUploadFile";
import "./_thumbnail.scss";
function Thumbnail({ uploadedFiles }) {
  return (
    <div className="file-upload">
      {uploadedFiles.length > 3
        ? uploadedFiles
            .filter((upload, index) => index < 4)
            .map((uploadedFile, index) => (
              <div className="img-box">
                <img src={useUploadFile.load(uploadedFile.name)} />
                <p>{uploadedFile.name}</p>
                {index === 3 && <span>+ {uploadedFiles.length - 3}</span>}
              </div>
            ))
        : uploadedFiles.map((uploadedFile) => (
            <div className="img-box">
              <img src={useUploadFile.load(uploadedFile.name)} />
              <p>{uploadedFile.name}</p>
            </div>
          ))}
    </div>
  );
}
export default Thumbnail;
