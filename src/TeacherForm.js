import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';

function TeacherForm() {
  const [searchParams] = useSearchParams();
  const [teacherData, setTeacherData] = useState({
    user: {
      userId: searchParams.get("Id"),
    },
    qualification: '',
    experience: 0,
    subjectTaught: '',
    specialization: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    // If the changed field is within the user object, update it properly
    if (name.startsWith("user.")) {
      setTeacherData(prevState => ({
        ...prevState,
        user: {
          ...prevState.user,
          [name.split(".")[1]]: value
        }
      }));
    } else {
      // Otherwise, update the top-level state directly
      setTeacherData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8081/teachers', teacherData);
      navigate("/teacher-list?stId="+response.data.teacherId);
      console.log(response.data);
      // Handle success, e.g., show a success message
    } catch (error) {
      console.error('Error creating teacher:', error);
      // Handle error, e.g., show an error message
    }
  };
  useEffect(() => {
    axios.get('http://localhost:8081/teachers/user/'+searchParams.get("Id"))
      .then(response => {
        // console.log(response.data);
        if(response.status === 200)
        navigate("/teacher-list?stId="+response.data.teacherId)
        // setTeacherData(response.data);
      })
      .catch(error => {
        console.error('Error fetching teachers:', error);
        
        // Handle error, show error message, etc.
      });
  }, []);

  return (
    <form onSubmit={handleSubmit}><br></br>
      {/* <input type="text" name="user.userId" value={teacherData.user.userId} onChange={handleChange} placeholder="User ID" /><br></br> */}
      <input type="text" name="qualification" value={teacherData.qualification} onChange={handleChange} placeholder="Qualification" /><br></br>
      <input type="number" name="experience" value={teacherData.experience} onChange={handleChange} placeholder="Experience" /><br></br>
      <input type="text" name="subjectTaught" value={teacherData.subjectTaught} onChange={handleChange} placeholder="Subject Taught" /><br></br>
      <input type="text" name="specialization" value={teacherData.specialization} onChange={handleChange} placeholder="Specialization" /><br></br>
      <button type="submit">Create Teacher</button>
    </form>
  );
}

export default TeacherForm;
