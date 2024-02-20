import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function AllCourses(props) {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    fetchCourses();
  }, []);

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
      let enrollmentData = {
        student: {
          studentId: props.studentId,
        },
        course: {
          courseId: course.courseId,
        },
        enrollmentDate: '',
        status: 'CONFIRMED'
      }
      const response = await axios.post('http://localhost:8084/enrollments/enroll/'+searchParams.get("stId")+'/'+course.courseId);
      console.log(response.data);
      props.refreshData();
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error creating course:', error);
      // Handle error, e.g., show an error message
    }
  }
  return (
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
  );
}

export default AllCourses;
