import { checkStatus } from "./useCheckStatus";
import http from "../http-commom";
const getByUsernameAndPassword = (username, password) => {
  return http
    .post("/login", {
      username,
      password,
    })
    .then(checkStatus)
    .then((response) => response.data);
};
const getByAuthentication = () => {
  return http
    .get("/accounts/authentication")
    .then(checkStatus)
    .then((response) => response.data);
};
const getById = (id) => {
  return http
    .get(`/accounts/${id}`)
    .then(checkStatus)
    .then((response) => response.data);
};
const getByTaskId = (id) => {
  return http
    .get(`/accounts/task-user/task/${id}`)
    .then(checkStatus)
    .then((response) => response.data);
};
const getAll = () => {
  return http
    .get(`/accounts`)
    .then(checkStatus)
    .then((response) => response.data);
};
const updateAll = (users) => {
  return http
    .post(`/accounts/list`, users)
    .then(checkStatus)
    .then((response) => response.data);
};
const deleteAll = (users) => {
  return http
    .put("/accounts", users)
    .then(checkStatus)
    .then((response) => response.data);
};

const useFetchUser = {
  getAll,
  getByUsernameAndPassword,
  getByAuthentication,
  getById,
  getByTaskId,
  updateAll,
  deleteAll,
};

export default useFetchUser;
