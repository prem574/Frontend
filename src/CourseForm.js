import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

function CourseForm() {
  const [searchParams] = useSearchParams();
  const [courseData, setCourseData] = useState({
    courseName: '',
    description: '',
    teacher: {
      teacherId: searchParams.get("Id"),
    },
    startDate: '',
    endDate: '',
    capacity: '',
    location: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the changed field is within the teacher object, update it properly
    if (name.startsWith("teacher.")) {
      setCourseData(prevState => ({
        ...prevState,
        teacher: {
          ...prevState.teacher,
          [name.split(".")[1]]: value
        }
      }));
    } else {
      // Otherwise, update the top-level state directly
      setCourseData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8083/courses', courseData);
      navigate("/teacher-list?stId="+searchParams.get("Id"));
      console.log(response.data);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error creating course:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="courseName" value={courseData.courseName} onChange={handleChange} placeholder="Course Name" /><br></br>
      <input type="text" name="description" value={courseData.description} onChange={handleChange} placeholder="Description" /><br></br>
      {/* <input type="number" name="teacher.teacherId" value={courseData.teacher.teacherId} onChange={handleChange} placeholder="Teacher ID" /><br></br> */}
      <input type="date" name="startDate" value={courseData.startDate} onChange={handleChange} placeholder="Start Date" /><br></br>
      <input type="date" name="endDate" value={courseData.endDate} onChange={handleChange} placeholder="End Date" /><br></br>
      <input type="number" name="capacity" value={courseData.capacity} onChange={handleChange} placeholder="Capacity" /><br></br>
      <input type="text" name="location" value={courseData.location} onChange={handleChange} placeholder="Location" /><br></br>
      <button type="submit">Create Course</button>
    </form>
  );
}

export default CourseForm;



