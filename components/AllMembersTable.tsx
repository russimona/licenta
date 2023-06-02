import { useAppDispatch, useAppSelector } from "@/core/store";
import { getAllUserData } from "@/redux/getAllUsers/slice";
import { getLoggedUserData } from "@/redux/getLoggedUser/slice";
import { STRINGS } from "@/utils/strings";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";
function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}
export const AllMembersTable = () => {
  const dispatch = useAppDispatch();
  const companyId = useAppSelector((state) => state.loggedUser.user.companyId);
  const users = useAppSelector((state) => state.allUsers.user).filter(
    (user) => user.companyId === companyId
  );
  useEffect(() => {
    dispatch(getLoggedUserData());
    dispatch(getAllUserData());
  }, [dispatch]);

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>{STRINGS.FIRST_NAME}</TableCell>
            <TableCell align="center">{STRINGS.LAST_NAME}</TableCell>
            <TableCell align="center">{STRINGS.EMAIL}</TableCell>
            <TableCell align="center">{STRINGS.ROLE}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.uid}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {user.firstName}
              </TableCell>
              <TableCell align="center">{user.lastName}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{user.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
