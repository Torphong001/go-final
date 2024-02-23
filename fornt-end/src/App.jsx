import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import StudentList from "./font_end/students";
import SubjectList from "./font_end/subject";
import TeacherList from "./font_end/teacher";
import Login from "./font_end/signin/signin";
import Signup from "./font_end/signup/signup";
import UserList from "./font_end/user";
import Navbar from "./font_end/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/Teacher" element={<TeacherList />} />
          <Route path="/Subject" element={<SubjectList />} />
          <Route path="/Student" element={<StudentList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/User" element={<UserList />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
