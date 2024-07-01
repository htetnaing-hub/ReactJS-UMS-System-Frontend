import axios from "axios";

const POST_REST_API = "http://localhost:8081/api";

export const listPost = () => axios.get(POST_REST_API + "/all-post");

export const createPost = (employeeId, post) =>
  axios.post(POST_REST_API + "/" + employeeId + "/post", post);
