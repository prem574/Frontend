import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();
    // const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:8080/users/username/${formData.username}`);
            // setUser(response.data);/*response.data.role === STUDENT*/
            if(response.data.role === "STUDENT" )
            navigate("/student?Id="+response.data.userId);
        // +"&courseId="+
        else
        navigate("/teacher?Id="+response.data.userId);
            setError(null);
        } catch (error) {
            // setUser(null);
            setError('Invalid username');
            console.error('Login error:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <div>{error}</div>}
            {/* {user && (
                <div>
                    <h2>User Details</h2>
                    <p>Username: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <p>date_of_birth :{user.dateOfBirth}</p>
                    <p>first_name:{user.firstName}</p>
                </div>
            )} */}
        </div>
    );
};

export default Login;
