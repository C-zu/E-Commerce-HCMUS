import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create context
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  // User state
  const [users, setUsers] = useState([]);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://m8mp78nj-8000.asse.devtunnels.ms/api/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Add user
  const addUser = async (newUser) => {
    try {
      const response = await axios.post('https://m8mp78nj-8000.asse.devtunnels.ms/api/users/', newUser);
      setUsers([...users, response.data]);
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Error adding user');
    }
  };

  // Update user
  const updateUser = async (user_id, updatedData, isFormData = false) => {
    try {
      const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
      const response = await axios.put(`https://m8mp78nj-8000.asse.devtunnels.ms/api/users/${user_id}`, updatedData, config);
      if (response.status === 200) {
        const updatedUser = response.data;
        setUsers(users.map(user => (user.user_id === user_id ? updatedUser : user)));
      } else {
        console.error('Unexpected response:', response);
        alert('Unexpected response');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Error updating user');
    }
  };
  // Delete user
  const deleteUser = async (user_id) => {
    try {
      await axios.delete(`https://m8mp78nj-8000.asse.devtunnels.ms/api/users/${user_id}`);
      setUsers(users.filter(user => user.user_id !== user_id));
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
    }
  };

  // Find user by ID
  const findUserById = (user_id) => {
    return users.find(user => user.user_id === user_id);
  };

  return (
    <UserContext.Provider value={{ users, addUser, updateUser, deleteUser, findUserById }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
