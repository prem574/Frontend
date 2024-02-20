import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function AllEnrollments() {
  const [searchParams] = useSearchParams();
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

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
  );
}

export default AllEnrollments;
