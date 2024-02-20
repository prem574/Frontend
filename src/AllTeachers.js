import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AllTeachers() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get('http://localhost:8081/teachers');
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>All Teachers</h2>
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
          {teachers.map(teacher => (
            <tr key={teacher.teacherId}>
              <td>{teacher.teacherId}</td>
              <td>{teacher.user.username}</td>
              <td>{teacher.user.email}</td>
              <td>{teacher.qualification}</td>
              <td>{teacher.experience}</td>
              <td>{teacher.subjectTaught}</td>
              <td>{teacher.specialization}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllTeachers;
