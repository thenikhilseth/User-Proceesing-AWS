import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  styled,
  Button,
} from "@mui/material";

const Component = styled(Box)`
  width: 80%;
  margin: 50px auto;
  & > h4 {
    margin-bottom: 20px;
  }
  & > div > table > thead {
    background-color: #000;
  }
  & > div > table > thead > tr > th {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
  }
  & > div > table > tbody > tr > td {
    font-size: 16px;
  }
`;

let defaultObj = [
  {
    id: 1,
    name: "TestUser",
    email: "test@aws.com",
    phone: "111222333",
    salary: 50000,
    age: 25,
  },
];

export default function Users() {
  const [users, setUsers] = useState([]);
  console.log(users);

  const API_URL = "https://npxuua8wyc.execute-api.us-east-1.amazonaws.com/Dev/"; //AWS API Gatway URL

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(API_URL);
      console.log(response.data.body);
      setUsers(JSON.parse(response.data.body).Items); //Converting JSON string to object using Parse and then get the value of items array
    };
    getData();
  }, []);

  const removeRow = (id) => {
    const updatedRow = users.filter((user) => user.id !== id);
    setUsers(updatedRow);
  };

  return (
    <Component>
      <Typography variant="h4"> </Typography>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Remove Entry</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.salary}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => removeRow(user.id)}
                  >
                    Remove Entry
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Component>
  );
}
