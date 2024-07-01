import axios from "axios";

const USER_REST_API = "http://localhost:8081/api/users";

export const listUser = () => axios.get(USER_REST_API);

export const createUser = (user) => axios.post(USER_REST_API, user);

export const getUser = (userId) => axios.get(USER_REST_API + "/" + userId);

export const updateUser = (userId, user) =>
  axios.put(USER_REST_API + "/" + userId, user);

export const deleteUser = (userId) =>
  axios.delete(USER_REST_API + "/" + userId);
