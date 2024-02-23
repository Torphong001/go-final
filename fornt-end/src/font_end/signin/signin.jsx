import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // เมื่อ login สำเร็จ
          // บันทึกข้อมูลผู้ใช้ลงใน localStorage
          localStorage.setItem("email", JSON.stringify(email));
          // นำผู้ใช้ไปยังหน้าหลักหลังจาก login สำเร็จ
          window.location.href = "/";
        } else {
          throw new Error("Login failed");
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed. Please try again.");
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <br />
      <br />
      <Typography variant="h3" sx={{ mb: 4 }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          sx={{ mb: 3 }}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
          sx={{ mb: 3 }}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
    </Container>
  );
}

export default Login;
