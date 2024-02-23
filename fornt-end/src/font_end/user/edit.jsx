import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function EditUser({ isOpen, onClose, user }) {
  const [updatedUserData, setUpdatedUserData] = useState({
    email: user.Email,
    name: user.Name,
    password: user.Password,
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setUpdatedUserData({
      email: user.Email,
      name: user.Name,
      password: user.Password,
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting updated data:", updatedUserData);
      const response = await axios.put(
        `http://localhost:5000/users/${user.Email}`,
        updatedUserData
      );
      console.log("Server response:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="text"
            fullWidth
            name="email"
            value={updatedUserData.email}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            name="name"
            value={updatedUserData.name}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            name="password"
            value={updatedUserData.password}
            onChange={handleChange}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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

export default EditUser;
