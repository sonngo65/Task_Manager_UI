import { Exception } from "sass";
import http from "../http-commom";
import { checkStatus } from "./useCheckStatus";
const getAllByUserId = async (id) => {
  return http
    .get(`/workspace/user/${id}`)
    .then(checkStatus)
    .then((response) => response.data);
};
const getById = async (workspaceId, userId) => {
  return http
    .get(`/workspace?workspaceId=${workspaceId}&userId=${userId}`)
    .then(checkStatus)
    .then((response) => response.data);
};
const add = async (data) => {
  return http
    .post("/workspace", data)
    .then(checkStatus)
    .then((response) => response.data);
};
const getFirstByUserId = (id) => {
  return http
    .get(`/workspace/user/${id}/first`)
    .then(checkStatus)
    .then((response) => response.data);
};
const join = (code, userId) => {
  return http
    .put(`/workspace?code=${code}&userId=${userId}`)
    .then(checkStatus)
    .then((response) => response.data);
};
const getRoleFirstWorkspace = (userId) => {
  return http
    .get(`/workspace/first/user/${userId}/role`)
    .then(checkStatus)
    .then((response) => response.data);
};
const getRoleWorkspace = (workspaceId, userId) => {
  return http
    .get(`/workspace/${workspaceId}/user/${userId}/role`)
    .then(checkStatus)
    .then((response) => response.data);
};
const useFetchWorkspace = {
  getAllByUserId,
  add,
  join,
  getById,
  getFirstByUserId,
  getRoleFirstWorkspace,
  getRoleWorkspace,
};
export default useFetchWorkspace;
