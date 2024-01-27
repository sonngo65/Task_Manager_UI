import { upload } from "@testing-library/user-event/dist/upload";
import http from "../http-commom";
import { checkStatus } from "./useCheckStatus";
const getById = (id) => {
  return http
    .get(`/tasks/${id}`)
    .then(checkStatus)
    .then((response) => response.data);
};
const post = (assignerId, workspaceId, taskInfo) => {
  return http
    .post("/tasks", {
      assignerId,
      workspaceId,
      ...taskInfo,
    })
    .then(checkStatus)
    .then((response) => response.data);
};
const postByParentId = (parentTaskId, assignerId, taskInfo) => {
  return http
    .post("/tasks", {
      parentTaskId,
      assignerId,
      ...taskInfo,
    })
    .then(checkStatus)
    .then((response) => response.data);
};
const getAllByParentId = (userId, parentTaskId) => {
  return http
    .get(`/tasks/parent-task?userId=${userId}&parentTaskId=${parentTaskId}`)
    .then(checkStatus)
    .then((response) => response.data);
};
const updateStatusTaskById = (childTaskId, userId, statusId) => {
  return http
    .put(
      `/tasks/completed?childTaskId=${childTaskId}&userId=${userId}&statusId=${statusId}`
    )
    .then(checkStatus)
    .then((response) => response.data);
};
const uploadFile = (uploadedFile, userId, taskId) => {
  return http
    .put(`/tasks/upload-file?userId=${userId}&taskId=${taskId}`, uploadedFile)
    .then(checkStatus)
    .then((response) => response.data);
};
const removeFile = (id) => {
  return http
    .delete(`/files/${id}`)
    .then(checkStatus)
    .then((response) => response.data);
};
const getStatusTaskById = (taskId, userId) => {
  return http
    .get(`/tasks/status?taskId=${taskId}&userId=${userId}`)
    .then(checkStatus)
    .then((response) => response.data);
};
const updateTask = (task) => {
  return http
    .put(`/tasks/${task.id}`, task)
    .then(checkStatus)
    .then((response) => response.data);
};
const deleteTask = (id) => {
  return http
    .delete(`/tasks/${id}`)
    .then(checkStatus)
    .then((response) => response.data);
};
const useFetchTask = {
  getById,
  post,
  postByParentId,
  getAllByParentId,
  updateStatusTaskById,
  uploadFile,
  removeFile,
  getStatusTaskById,
  updateTask,
  deleteTask,
};
export default useFetchTask;
