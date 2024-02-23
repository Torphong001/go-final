import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

function Signup() {
  const [userData, setUserData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        // เมื่อสมัครสมาชิกเสร็จสมบูรณ์ ให้เปลี่ยนทางไปยังหน้า login ทันที
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Box className="container mt-5">
      <ToastContainer />
      <br />
      <br />
      <br />
      <Typography variant="h3" sx={{ mb: 4 }}>
        Register
      </Typography>
      {!signupSuccess ? (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="Name"
                name="Name"
                label="Name"
                value={userData.Name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="Email"
                name="Email"
                label="Email"
                type="email"
                value={userData.Email}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="Password"
                name="Password"
                label="Password"
                type="password"
                value={userData.Password}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Sign Up
            </Button>
          </Box>
        </form>
      ) : null}
    </Box>
  );
}

export default Signup;
