import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout"; // เพิ่มไอคอนเข้ามา

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false); // เปลี่ยนสถานะเป็นไม่ได้ล็อกอิน
    window.location.href = "/login";
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {loggedIn && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Home
            </Link>
          </Typography>
          {loggedIn ? (
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          ) : (
            <>
              <Button color="inherit">
                <Link
                  to="/login"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  to="/signup"
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  Register
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem
            button
            component={Link}
            to="/indexStudent"
            onClick={toggleDrawer}
          >
            <ListItemText primary="Students" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/indexSubject"
            onClick={toggleDrawer}
          >
            <ListItemText primary="Subjects" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/indexTeacher"
            onClick={toggleDrawer}
          >
            <ListItemText primary="Teachers" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/indexUser"
            onClick={toggleDrawer}
          >
            <ListItemText primary="Users" />
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
