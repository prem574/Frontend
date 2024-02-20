import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './app/Userform.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        role: '',
        firstName: '',
        lastName: '',
        dateOfBirth: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/users', formData);
            fetchUsers();
            navigate("/login");
            setFormData({
                username: '',
                password: '',
                email: '',
                role: '',
                firstName: '',
                lastName: '',
                dateOfBirth: ''
            });
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="container">
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
                </div>
                <div className="form-group">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                </div>
                <div className="form-group">
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                </div>
                <div className="form-group">
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Select Role</option>
                        <option value="TEACHER">Teacher</option>
                        <option value="STUDENT">Student</option>
                    </select>
                </div>
                <div className="form-group">
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                </div>
                <div className="form-group">
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                </div>
                <div className="form-group">
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} placeholder="Date of Birth" />
                </div>
                <button type="submit">Register</button>
            </form>

            {/* <div className="user-list">
                <h2>Users</h2>
                <table className="user-table">
    <thead>
        <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
        </tr>
    </thead>
    <tbody>
        {users.map(user => (
            <tr key={user.userId}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
            </tr>
        ))}
    </tbody>
</table> */}


            </div>
        
    );
};

export default UserForm;


