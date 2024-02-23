import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Container,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddTeacher from "./add";
import EditTeacher from "./edit";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/teachers");
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (teacherId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/teachers/${teacherId}`);
        setTeachers(teachers.filter((teacher) => teacher.ID !== teacherId));
        toast.success("Teacher deleted successfully!");
      } catch (error) {
        console.error("Error deleting teacher:", error);
        toast.error("Failed to delete teacher!");
      }
    }
  };

  const handleEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setIsEditModalOpen(true);
  };

  const filteredTeachers = teachers.filter((teacher) => {
    return (
      teacher.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.ID.toString().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Container mt={4}>
      <h1 className="text-center mb-4"></h1>
      <br />
      <br />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Teacher
        </Button>
      </div>
      <Table striped>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTeachers.map((teacher) => (
            <TableRow key={teacher.ID}>
              <TableCell>{teacher.FirstName}</TableCell>
              <TableCell>{teacher.LastName}</TableCell>
              <TableCell>{teacher.Age}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(teacher)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(teacher.ID)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddTeacher
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          fetchTeachers();
        }}
      />
      {selectedTeacher && (
        <EditTeacher
          teacher={selectedTeacher}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            fetchTeachers();
          }}
        />
      )}
      <ToastContainer />
    </Container>
  );
}

export default TeacherList;
