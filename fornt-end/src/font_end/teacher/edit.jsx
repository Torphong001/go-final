import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function EditTeacher({ isOpen, onClose, teacher }) {
  const [updatedTeacherData, setUpdatedTeacherData] = useState({
    firstName: teacher.FirstName,
    lastName: teacher.LastName,
    Age: teacher.Age,
  });

  useEffect(() => {
    setUpdatedTeacherData({
      firstName: teacher.FirstName,
      lastName: teacher.LastName,
      Age: teacher.Age,
    });
  }, [teacher]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field is Age, parse it as an integer
    const parsedValue = name === "Age" ? parseInt(value) : value;
    setUpdatedTeacherData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting updated data:", updatedTeacherData);
      const response = await axios.put(
        `http://localhost:5000/teachers/${teacher.ID}`,
        updatedTeacherData
      );
      console.log("Server response:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Teacher</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            name="firstName"
            value={updatedTeacherData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            name="lastName"
            value={updatedTeacherData.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="Age"
            label="Age"
            type="number"
            fullWidth
            name="Age"
            value={updatedTeacherData.Age}
            onChange={handleChange}
          />
          <DialogActions>
            <Button type="submit" color="primary">
              Update
            </Button>
            <Button onClick={onClose} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditTeacher;
