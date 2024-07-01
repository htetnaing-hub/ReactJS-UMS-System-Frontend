import React, { useEffect, useState } from "react";
import { listPost } from "../services/PostService";
import { useNavigate } from "react-router-dom";

const ListPostComponent = () => {
  const [posts, setPosts] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    listPost()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function showAllEmployee() {
    navigator("/users");
  }

  return (
    <div className="container">
      <br />
      <h4 className="fw-bold">
        Post List
        <button
          type="button"
          class="btn btn-primary mb-2 ms-3"
          onClick={showAllEmployee}
        >
          Users
        </button>
      </h4>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Post Id</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.description}</td>
              <td>{post.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListPostComponent;
