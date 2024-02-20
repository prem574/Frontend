
import AllTeachers from './AllTeachers';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CourseList from './AllCourses';
import StudentForm from './StudentForm';
import StudentList from './StudentList';
import TeacherForm from './TeacherForm';
import UserForm from './UserForm';
import EnrollmentForm from './EnrollmentForm';
import Login from './Login';
import CourseForm from './CourseForm';
import TeachersList from './app/TeachersList';
import Header from './Layout';
import Layout from './Layout';

function App() {
  return (
    <BrowserRouter>
    <Layout>
    <Routes>
      <Route path="/" element={<UserForm />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/student" element={<StudentForm />}/>
      <Route path="/student-list" element={<StudentList/>}/>
      <Route path="/teacher" element={<TeacherForm />}/>
      <Route path="/course" element={<CourseForm />}/>
      <Route path="/course-list" element={<CourseList />}/>
      <Route path="/enrollment" element={<EnrollmentForm/>}/>
      <Route path="/AllTeacher" element={<AllTeachers/>}/>
      <Route path="/teacher-list" element={<TeachersList/>}/>
      {/* <Route path="/head" element={<Layout/>}/> */}


    </Routes>
    </Layout>
  </BrowserRouter>
  );
}

export default App;
