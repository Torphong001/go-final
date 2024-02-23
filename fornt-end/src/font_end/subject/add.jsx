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

function AddSubject({ isOpen, onClose }) {
  const [newSubject, setNewSubject] = useState({
    Subject_id: "",
    Subject_name: "",
    Subject_credit: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the field is Subject_credit, parse it as a float
    const parsedValue = name === "Subject_credit" ? parseFloat(value) : value;
    setNewSubject((prevSubject) => ({
      ...prevSubject,
      [name]: parsedValue,
    }));
  };

  const handleAddSubject = async () => {
    try {
      await axios.post("http://localhost:5000/subjects", {
        ...newSubject,
        Subject_credit: parseFloat(newSubject.Subject_credit), // Convert Subject_credit to number
      });
      onClose(); // Close the dialog after successfully adding data
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Add Subject</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="Subject_id"
          label="Subject ID"
          type="text"
          fullWidth
          name="Subject_id"
          value={newSubject.Subject_id}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="Subject_name"
          label="Subject Name"
          type="text"
          fullWidth
          name="Subject_name"
          value={newSubject.Subject_name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          id="Subject_credit"
          label="Subject Credit"
          type="number"
          step="0.01"
          fullWidth
          name="Subject_credit"
          value={newSubject.Subject_credit}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddSubject} color="primary">
          Add
        </Button>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSubject;
