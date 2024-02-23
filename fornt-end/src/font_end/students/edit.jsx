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

function EditStudent({ isOpen, onClose, student }) {
  const [updatedStudentData, setUpdatedStudentData] = useState({
    studentid: student.StudentId,
    firstName: student.FirstName,
    lastName: student.LastName,
    age: student.Age,
  });

  useEffect(() => {
    setUpdatedStudentData({
      studentid: student.StudentId,
      firstName: student.FirstName,
      lastName: student.LastName,
      age: student.Age,
    });
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field is Age, parse it as an integer
    const parsedValue = name === "age" ? parseInt(value) : value;
    setUpdatedStudentData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting updated data:", updatedStudentData);
      const response = await axios.put(
        `http://localhost:5000/students/${student.ID}`,
        updatedStudentData
      );
      console.log("Server response:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Student</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="studentId"
            label="Student ID"
            type="text"
            fullWidth
            name="studentid"
            value={updatedStudentData.studentid}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            name="firstName"
            value={updatedStudentData.firstName}
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
            value={updatedStudentData.lastName}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="age"
            label="Age"
            type="number"
            fullWidth
            name="age"
            value={updatedStudentData.age}
            onChange={handleChange}
            required
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

export default EditStudent;
