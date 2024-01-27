import http from "../http-commom";
import { checkStatus } from "./useCheckStatus";

export const getAllByTaskId = (id) => {
  return http
    .get(`/task-user/task/${id}`)
    .then(checkStatus)
    .then((response) => response.data);
};
export const getByParentTaskIdAndUserId = (parentTaskId, userId) => {
  return http
    .get(
      `/task-user/children-task?parentTaskId=${parentTaskId}&userId=${userId}`
    )
    .then(checkStatus)
    .then((response) => response.data);
};
export const getDetailByWorkspaceIdAndUserId = (workspaceId, userId) => {
  return http
    .get(`/task-user/workspace/${workspaceId}/user/${userId}`)
    .then(checkStatus)
    .then((response) => response.data);
};
export const getDetailByFirstWorkspaceAndUserId = (userId) => {
  return http
    .get(`/task-user/workspace/first/user/${userId}`)
    .then(checkStatus)
    .then((response) => response.data);
};
const loadStatistic = (userId) => {
  return http
    .get(`/task-user/statistic?userId=${userId}`)
    .then(checkStatus)
    .then((response) => response.data);
};

const useFetchTaskUser = {
  getAllByTaskId,
  getByParentTaskIdAndUserId,
  getDetailByWorkspaceIdAndUserId,
  getDetailByFirstWorkspaceAndUserId,
  loadStatistic,
};
export default useFetchTaskUser;
