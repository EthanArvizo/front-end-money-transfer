import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import axiosInstance from "../../services/axiosInstance";

const UserList = ({ onSelectUser, loggedInUserId }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`/user/list`);
        // Filter out the logged-in user from the list
        const filteredUsers = response.data.filter((user) => {
          const isUserLoggedIn = user.id === loggedInUserId;
          return !isUserLoggedIn;
        });
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };

    fetchUsers();
  }, [loggedInUserId]);

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    onSelectUser(userId);
  };

  return (
    <div>
      <Typography variant="h6">Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                style={{ cursor: "pointer", backgroundColor: selectedUserId === user.id ? "#f0f0f0" : "inherit" }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserList;
