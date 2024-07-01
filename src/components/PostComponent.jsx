import React, { useState } from "react";
import { createPost } from "../services/PostService";
import { useNavigate, useParams } from "react-router-dom";

const PostComponent = () => {
  /**
   * To set description value from Post Description input field
   */
  const [description, setDescription] = useState("");

  /**
   * To set status value from Post Status input field
   */
  const [status, setStatus] = useState("");

  const { id } = useParams();

  const navigator = useNavigate();

  function savePost(e) {
    e.preventDefault();
    const post = { description, status };
    console.log(post);

    createPost(id, post).then((response) => {
      console.log(response.data);
      navigator("/show-all-post");
    });
  }

  const backToListEmployeeComponent = () => navigator("/users");

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <div className="card-header">
            <h5 className="text-center fw-bolder mt-2">Add Post</h5>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Description:</label>
                <input
                  type="text"
                  placeholder="Enter Description"
                  name="description"
                  value={description}
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Status:</label>
                <input
                  type="text"
                  placeholder="Enter Status"
                  name="status"
                  value={status}
                  className="form-control"
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
              <button
                type="button"
                className="btn btn-success mt-1"
                onClick={savePost}
              >
                Submit
              </button>
              <button
                type="button"
                className="btn btn-danger mt-1 ms-2"
                onClick={backToListEmployeeComponent}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
