import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';

function TeachersList() {
  const [searchParams] = useSearchParams();
  const [teachers, setTeachers] = useState(null);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/teachers/'+searchParams.get("stId"));
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      // Handle error, e.g., show an error message
    }
  };

 


  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8083/courses/teacher/'+searchParams.get("stId"));
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Handle error, e.g., show an error message
    }
  };
 

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get('http://localhost:8084/enrollments/teacher/'+searchParams.get("stId"));
      setEnrollments(response.data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>All Teachers</h2>
       <button onClick={()=>navigate('/course?Id='+searchParams.get("stId"))}>AddCourse</button> 
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Qualification</th>
            <th>Experience</th>
            <th>Subject Taught</th>
            <th>Specialization</th>
          </tr>
        </thead>
        <tbody>
            {
         teachers!== null &&
            <tr key={teachers.teacherId}>
              <td>{teachers.teacherId}</td>
              <td>{teachers.user.username}</td>
              <td>{teachers.user.email}</td>
              <td>{teachers.qualification}</td>
              <td>{teachers.experience}</td>
              <td>{teachers.subjectTaught}</td>
              <td>{teachers.specialization}</td>
            </tr>
}
        </tbody>
      </table>

      <div>
      <h2>All Courses</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Course Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Capacity</th>
            <th>Location</th>
            <th>Teacher ID</th>
            <th>Teacher Name</th>
            <th>Teacher Email</th>
            {/* Add more teacher details here */}
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.courseId}>
              <td>{course.courseId}</td>
              <td>{course.courseName}</td>
              <td>{course.description}</td>
              <td>{course.startDate}</td>
              <td>{course.endDate}</td>
              <td>{course.capacity}</td>
              <td>{course.location}</td>
              <td>{course.teacher ? course.teacher.teacherId : 'None'}</td>
              <td>{course.teacher ? course.teacher.user.username : 'None'}</td>
              <td>{course.teacher ? course.teacher.user.email : 'None'}</td>
              {/* Add more teacher details here */}
              {/* <td><button onClick= {()=>handleEnroll(course)} type="submit">enroll</button></td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div>
      <h2>All Enrollments</h2>
      <table>
        <thead>
          <tr>
            <th>Enrollment ID</th>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Student Email</th>
            <th>Course ID</th>
            <th>Enrollment Date</th>
            <th>Status</th>
            <th>Course Name</th>
            <th>Teacher Name</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map(enrollment => (
            <tr key={enrollment?.enrollmentId}>
              <td>{enrollment?.enrollmentId}</td>
              <td>{enrollment?.student.studentId}</td>
              <td>{enrollment?.student.user.firstName} {enrollment?.student.user.lastName}</td>
              <td>{enrollment?.student.user.email}</td>
              <td>{enrollment?.course.courseId}</td>
              <td>{enrollment?.enrollmentDate}</td>
              <td>{enrollment?.status}</td>
              <td>{enrollment?.course.courseName}</td>
              <td>{enrollment?.course.teacher ? enrollment?.course.teacher.user.username : 'None'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>


  );
}

export default TeachersList;
