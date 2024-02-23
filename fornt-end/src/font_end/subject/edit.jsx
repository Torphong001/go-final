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

function EditSubject({ isOpen, onClose, subject }) {
  const [updatedSubjectData, setUpdatedSubjectData] = useState({
    Subject_id: subject.Subject_id,
    Subject_name: subject.Subject_name,
    Subject_credit: subject.Subject_credit,
  });

  useEffect(() => {
    setUpdatedSubjectData({
      Subject_id: subject.Subject_id,
      Subject_name: subject.Subject_name,
      Subject_credit: subject.Subject_credit,
    });
  }, [subject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "Subject_credit" ? parseFloat(value) : value; // Parse Subject_credit as float
    setUpdatedSubjectData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting updated data:", updatedSubjectData);
      const response = await axios.put(
        `http://localhost:5000/subjects/${subject.ID}`,
        updatedSubjectData
      );
      console.log("Server response:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Subject</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="Subject_id"
            label="Subject ID"
            type="text"
            fullWidth
            name="Subject_id"
            value={updatedSubjectData.Subject_id}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="Subject_name"
            label="Subject Name"
            type="text"
            fullWidth
            name="Subject_name"
            value={updatedSubjectData.Subject_name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="Subject_credit"
            label="Subject Credit"
            type="number"
            step="0.01"
            fullWidth
            name="Subject_credit"
            value={updatedSubjectData.Subject_credit}
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

export default EditSubject;
