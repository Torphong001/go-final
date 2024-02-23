import React, { useState } from "react";
import axios from "axios";
import {
  Modal,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

function AddStudent({ isOpen, onClose }) {
  const [newStudent, setNewStudent] = useState({
    StudentId: "",
    FirstName: "",
    LastName: "",
    Age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field is Age, parse it as an integer
    const parsedValue = name === "Age" ? parseInt(value) : value;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: parsedValue,
    }));
  };

  const handleAddStudent = async () => {
    try {
      await axios.post("http://localhost:5000/students", newStudent);
      onClose(); // Close the dialog after successfully adding data
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add Student</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="studentId"
          label="Student ID"
          type="text"
          fullWidth
          name="StudentId"
          value={newStudent.StudentId}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="firstName"
          label="First Name"
          type="text"
          fullWidth
          name="FirstName"
          value={newStudent.FirstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="lastName"
          label="Last Name"
          type="text"
          fullWidth
          name="LastName"
          value={newStudent.LastName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="Age"
          label="Age"
          type="number"
          fullWidth
          name="Age"
          value={newStudent.Age}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddStudent} color="primary">
          Add
        </Button>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddStudent;
