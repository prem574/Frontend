import React, { useState } from 'react';
import axios from 'axios';

function EnrollmentForm() {
  const [enrollmentData, setEnrollmentData] = useState({
    student: {
      studentId: '',
    },
    course: {
      courseId: '',
    },
    enrollmentDate: '',
    status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the changed field is within the student or course object, update it properly
    if (name.startsWith("student.") || name.startsWith("course.")) {
      setEnrollmentData(prevState => ({
        ...prevState,
        [name.split(".")[0]]: {
          ...prevState[name.split(".")[0]],
          [name.split(".")[1]]: value
        }
      }));
    } else {
      // Otherwise, update the top-level state directly
      setEnrollmentData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8084/enrollments', enrollmentData);
      console.log(response.data);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error creating enrollment:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="student.studentId" value={enrollmentData.student.studentId} onChange={handleChange} placeholder="Student ID" /><br></br>
      <input type="text" name="course.courseId" value={enrollmentData.course.courseId} onChange={handleChange} placeholder="Course ID" /><br></br>
      <input type="date" name="enrollmentDate" value={enrollmentData.enrollmentDate} onChange={handleChange} placeholder="Enrollment Date" /><br></br>
      <input type="text" name="status" value={enrollmentData.status} onChange={handleChange} placeholder="Status" /><br></br>
      <button type="submit">Create Enrollment</button>
    </form>
  );
}

export default EnrollmentForm;
