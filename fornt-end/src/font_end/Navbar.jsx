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
import LogoutIcon from "@mui/icons-material/Logout"; // เพิ่มไอคอนเข้ามา

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("email") ? true : false
  );

  const handleLogout = () => {
    localStorage.removeItem("email");
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
            to="/Student"
            onClick={toggleDrawer}
          >
            <ListItemText primary="Students" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/Subject"
            onClick={toggleDrawer}
          >
            <ListItemText primary="Subjects" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/Teacher"
            onClick={toggleDrawer}
          >
            <ListItemText primary="Teachers" />
          </ListItem>
          <ListItem button component={Link} to="/User" onClick={toggleDrawer}>
            <ListItemText primary="Users" />
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
