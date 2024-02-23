import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

function AddTeacher({ isOpen, onClose }) {
  const [newTeacher, setNewTeacher] = useState({
    FirstName: "",
    LastName: "",
    Age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field is Age, parse it as an integer
    const parsedValue = name === "Age" ? parseInt(value) : value;
    setNewTeacher((prevTeacher) => ({
      ...prevTeacher,
      [name]: parsedValue,
    }));
  };

  const handleAddTeacher = async () => {
    try {
      await axios.post("http://localhost:5000/teachers", newTeacher);
      onClose(); // Close the dialog after successfully adding data
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add Teacher</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="firstName"
          label="First Name"
          type="text"
          fullWidth
          name="FirstName"
          value={newTeacher.FirstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="lastName"
          label="Last Name"
          type="text"
          fullWidth
          name="LastName"
          value={newTeacher.LastName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="Age"
          label="Age"
          type="number"
          fullWidth
          name="Age"
          value={newTeacher.Age}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddTeacher} color="primary">
          Add
        </Button>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTeacher;
