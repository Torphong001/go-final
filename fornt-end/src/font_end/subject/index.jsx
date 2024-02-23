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
import AddSubject from "./add";
import EditSubject from "./edit";

function SubjectList() {
  const [subjects, setSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleDelete = async (subjectId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this subject?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/subjects/${subjectId}`);
        setSubjects(subjects.filter((subject) => subject.ID !== subjectId));
        toast.success("Subject deleted successfully!");
      } catch (error) {
        console.error("Error deleting subject:", error);
        toast.error("Failed to delete subject!");
      }
    }
  };

  const handleEdit = (subject) => {
    setSelectedSubject(subject);
    setIsEditModalOpen(true);
  };

  const filteredSubjects = subjects.filter((subject) => {
    return (
      subject.Subject_id.toString().includes(searchTerm) ||
      subject.Subject_name.toLowerCase().includes(searchTerm.toLowerCase())
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
          Add Subject
        </Button>
      </div>
      <Table striped>
        <TableHead>
          <TableRow>
            <TableCell>Subject ID</TableCell>
            <TableCell>Subject Name</TableCell>
            <TableCell>Subject Credit</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredSubjects.map((subject) => (
            <TableRow key={subject.ID}>
              <TableCell>{subject.Subject_id}</TableCell>
              <TableCell>{subject.Subject_name}</TableCell>
              <TableCell>{subject.Subject_credit}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(subject)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(subject.ID)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AddSubject
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          fetchSubjects(); // Refresh data after closing Add Subject modal
        }}
      />
      {selectedSubject && (
        <EditSubject
          subject={selectedSubject}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            fetchSubjects(); // Refresh data after closing Edit Subject modal
          }}
        />
      )}
      <ToastContainer />
    </Container>
  );
}

export default SubjectList;
