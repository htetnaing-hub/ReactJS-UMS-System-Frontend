import React, { useEffect, useState } from "react";
import { createUser, getUser, updateUser } from "../services/UserService";
import { useNavigate, useParams } from "react-router-dom";

const UserComponent = () => {
  /**
   * To set firstName value from User First Name input field
   */
  const [firstName, setFirstName] = useState("");

  /**
   * To set lastName value from User Last Name input field
   */
  const [lastName, setLastName] = useState("");

  /**
   * To set email value from User Email input field
   */
  const [email, setEmail] = useState("");

  const { id } = useParams();

  /**
   * To hold validation error messages
   */
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  /**
   * To navigate ListUserComponent
   */
  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getUser(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  /**
   * Save user data
   *
   * @param {Event} e - The event object representing the form submission
   */
  const saveOrUpdateUser = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const user = { firstName, lastName, email };
      console.log(user);

      if (id) {
        updateUser(id, user)
          .then((response) => {
            navigator("/users");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createUser(user)
          .then((response) => {
            console.log(response.data);
            navigator("/users");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  /**
   * Form validation
   *
   * @returns {boolean} - True if the form is valid, otherwise false
   */
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First name is required";
      valid = false;
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last name is required";
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h5 className="text-center mt-2 fw-bolder">Update User</h5>;
    } else {
      return <h5 className="text-center mt-2 fw-bolder">Add User</h5>;
    }
  }

  const backToListUserComponent = () => navigator("/users");

  /**
   * Add User Form
   */
  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          <div className="card-header">{pageTitle()}</div>
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">User First Name:</label>
                <input
                  type="text"
                  placeholder="Enter User First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">User Last Name:</label>
                <input
                  type="text"
                  placeholder="Enter User Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">User Email:</label>
                <input
                  type="text"
                  placeholder="Enter User Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button
                className="btn btn-success mt-1"
                onClick={saveOrUpdateUser}
              >
                Submit
              </button>
              <button
                className="btn btn-danger mt-1 ms-2"
                onClick={backToListUserComponent}
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

/**
 * Represents the default export of the user component.
 * @exports UserComponent
 */
export default UserComponent;
