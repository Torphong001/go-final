import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Container,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudent from "./add";
import EditStudent from "./edit";

function StudentList() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (studentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/students/${studentId}`);
        setStudents(students.filter((student) => student.ID !== studentId));
        toast.success("Student deleted successfully!");
      } catch (error) {
        console.error("Error deleting student:", error);
        toast.error("Failed to delete student!");
      }
    }
  };

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.StudentId.toString().includes(searchTerm) ||
      student.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.LastName.toLowerCase().includes(searchTerm.toLowerCase())
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
          Add Student
        </Button>
      </div>
      <Table striped>
        <TableHead>
          <TableRow>
            <TableCell>Student ID</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredStudents.map((student) => (
            <TableRow key={student.ID}>
              <TableCell>{student.StudentId}</TableCell>
              <TableCell>{student.FirstName}</TableCell>
              <TableCell>{student.LastName}</TableCell>
              <TableCell>{student.Age}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(student)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(student.ID)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddStudent
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          fetchStudents(); // Refresh data after closing Add Student modal
        }}
      />
      {selectedStudent && (
        <EditStudent
          student={selectedStudent}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            fetchStudents(); // Refresh data after closing Edit Student modal
          }}
        />
      )}
      <ToastContainer />
    </Container>
  );
}

export default StudentList;
