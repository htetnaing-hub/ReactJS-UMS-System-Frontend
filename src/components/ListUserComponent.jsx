import React, { useEffect, useState } from "react";
import { listUser, deleteUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";

const ListUserComponent = () => {
  const [users, setUsers] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
    listUser()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewUser() {
    navigator("/add-user");
  }

  function showAllPost() {
    navigator("/show-all-post");
  }

  function updateUser(id) {
    navigator(`/edit-user/${id}`);
  }

  function removeUser(id) {
    console.log("User with ID number:" + id + " is already deleted.");
    deleteUser(id)
      .then((response) => {
        getAllUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function createPost(id) {
    navigator(`/create-post/${id}`);
  }

  return (
    <div className="container">
      <br />
      <h4 className="fw-bold">
        User List
        <button
          type="button"
          className="btn btn-primary mb-2 ms-3"
          onClick={showAllPost}
        >
          Posts
        </button>
        <button
          type="button"
          className="btn btn-primary mb-2 ms-1"
          onClick={addNewUser}
        >
          Create User
        </button>
      </h4>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td className="text-center">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => createPost(user.id)}
                >
                  Post
                </button>
                <button
                  type="button"
                  className="btn btn-warning ms-2"
                  onClick={() => updateUser(user.id)}
                >
                  U
                </button>
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  onClick={() => removeUser(user.id)}
                >
                  D
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUserComponent;
