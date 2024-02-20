import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AllCourses from './AllCourses';
import AllEnrollments from './AllEnrollments';

function StudentList() {
  const [searchParams] = useSearchParams();
  const [refreshList,setRefreshList]=useState(false);
  const [students, setStudents] = useState(null);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8082/api/students/'+searchParams.get("stId"))
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
        // Handle error, show error message, etc.
      });
  }, [refreshList]);

  useEffect(() => {
    fetchCourses();
  }, [refreshList]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8084/enrollments/unselected-courses/'+searchParams.get("stId"));
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      // Handle error, e.g., show an error message
    }
  };

  async function handleEnroll(course) {
    
    try {
      const response = await axios.post('http://localhost:8084/enrollments/enroll/'+searchParams.get("stId")+'/'+course.courseId);
      console.log(response.data);
      setRefreshList(!refreshList);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error creating course:', error);
      // Handle error, e.g., show an error message
    }
  }

  useEffect(() => {
    fetchEnrollments();
  }, [refreshList]);

  const fetchEnrollments = async () => {
    try {
      const response = await axios.get('http://localhost:8084/enrollments/student/'+searchParams.get("stId"));
      setEnrollments(response.data);
    } catch (error) {
      console.error('Error fetching enrollments:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>Students List</h2>
      <table>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Grade</th>
            <th>Parent/Guardian</th>
            <th>Class Name</th>
            <th>School</th>
          </tr>
        </thead>
        <tbody>
          {
            students!==null &&
            <tr key={students.studentId}>
              <td>{students.studentId}</td>
              <td>{students.user.userId}</td>
              <td>{students.user.username}</td>
              <td>{students.user.email}</td>
              <td>{students.grade}</td>
              <td>{students.parentGuardian}</td>
              <td>{students.className}</td>
              <td>{students.school}</td>
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
              <td><button onClick= {()=>handleEnroll(course)} type="submit">enroll</button></td>
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
            <tr key={enrollment.enrollmentId}>
              <td>{enrollment.enrollmentId}</td>
              <td>{enrollment.student.studentId}</td>
              <td>{enrollment.student.user.firstName} {enrollment.student.user.lastName}</td>
              <td>{enrollment.student.user.email}</td>
              <td>{enrollment.course.courseId}</td>
              <td>{enrollment.enrollmentDate}</td>
              <td>{enrollment.status}</td>
              <td>{enrollment.course.courseName}</td>
              <td>{enrollment.course.teacher ? enrollment.course.teacher.user.username : 'None'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      
    </div>
  );
}

export default StudentList;
