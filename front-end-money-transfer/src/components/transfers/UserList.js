import React, { useState, useEffect } from 'react';
import axiosInstance from '../../services/axiosInstance';

const UserList = ({ onSelectUser, loggedInUserId }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`/user/list`);
        // Filter out the logged-in user from the list
        const filteredUsers = response.data.filter(user => {
          const isUserLoggedIn = user.id === loggedInUserId;
          console.log(`User ID: ${user.id}, Username: ${user.username}, Is Logged In: ${isUserLoggedIn}`);
          return !isUserLoggedIn;
        });
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, [loggedInUserId]);

  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} onClick={() => onSelectUser(user.id)}>
              <td>{user.id}</td>
              <td>{user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;