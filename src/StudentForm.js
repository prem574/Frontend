
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import StudentList from './StudentList';

function StudentForm() {
  const [searchParams] = useSearchParams();
  const [studentData, setStudentData] = 
   useState({
     user: {
       userId: searchParams.get("Id"),
     },
     grade: '',
     parentGuardian: '',
     className: '',
     school: ''
   });


  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the changed field is within the user object, update it properly
    if (name.startsWith("user.")) {
      setStudentData(prevState => ({
        ...prevState,
        user: {
          ...prevState.user,
          [name.split(".")[1]]: value
        }
      }));
    } else {
      // Otherwise, update the top-level state directly
      setStudentData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8082/api/students', studentData);
      navigate("/student-list?stId="+response.data.studentId);
      // navigate("/student?Id="+response.data.userId);
      console.log(response.data);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error creating student:', error);
      // Handle error, e.g., show an error message
    }
  };
  useEffect(() => {
    axios.get('http://localhost:8082/api/students/user/'+searchParams.get("Id"))
      .then(response => {
        // console.log(response.data);
        if(response.status === 200)
        navigate("/student-list?stId="+response.data.studentId)
        setStudentData(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
        
        // Handle error, show error message, etc.
      });
  }, []);

  return (
    
    (<form onSubmit={handleSubmit}>
      {/* <input type="text" name="user.userId" value={studentData.user.userId} onChange={handleChange} placeholder="User ID" /><br></br> */}
      <input type="number" name="grade" value={studentData?.grade} onChange={handleChange} placeholder="Grade" /><br></br>
      <input type="text" name="parentGuardian" value={studentData?.parentGuardian} onChange={handleChange} placeholder="Parent/Guardian" /><br></br>
      <input type="text" name="className" value={studentData?.className} onChange={handleChange} placeholder="Class Name" /><br></br>
      <input type="text" name="school" value={studentData?.school} onChange={handleChange} placeholder="School" /><br></br>
      <button type="submit">Create Student</button>

    </form>)
   
  );
}

export default StudentForm;
