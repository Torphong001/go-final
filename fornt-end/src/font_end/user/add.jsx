import React, { useState } from "react";
import axios from "axios";

function AddUser({ isOpen, onClose }) {
  const [newUser, setNewUser] = useState({
    Email: "",
    Name: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleAddUser = async () => {
    try {
      await axios.post("http://localhost:5000/users", newUser);
      onClose(); // ปิด dialog เมื่อเพิ่มข้อมูลเสร็จสมบูรณ์
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add User</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="Email"
                  value={newUser.Email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  name="Name"
                  value={newUser.Name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Password" className="form-label">
                  Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Password"
                  name="Password"
                  value={newUser.Password}
                  onChange={handleChange}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddUser}
            >
              Add
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUser;
