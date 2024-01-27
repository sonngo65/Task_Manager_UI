import http from "../http-commom";
import { checkStatus } from "./useCheckStatus";

const upload = (data) =>
  http
    .post("/files", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(checkStatus)
    .then((response) => response.data);
const load = (fileName) => {
  return `http://localhost:8080/api/v1/files/${fileName}`;
};
const download = (fileName) => {
  return `http://localhost:8080/api/v1/files/download/${fileName}`;
};
const useUploadFile = {
  upload,
  load,
  download,
};
export default useUploadFile;
