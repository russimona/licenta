import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { getLoggedUserData } from "@/redux/getLoggedUser/slice";
import { getAllUserData } from "@/redux/getAllUsers/slice";
import { STRINGS } from "@/utils/strings";
import { CalendarAll } from "./FreeDaysCalendarAll";
import { Colors } from "@/utils/colors";

function createData(
  firstName: string,
  lastName: string,
  email: string,
  role: string,
  uid: string
) {
  return {
    firstName,
    lastName,
    email,
    role,
    uid,
  };
}

const Row = (props: { row: ReturnType<typeof createData> }) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.firstName}
        </TableCell>
        <TableCell align="left">{row.lastName}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.role}</TableCell>
      </TableRow>
      <TableRow
        style={{
          background: Colors.lightGray,
          maxWidth: "70hw",
          overflow: "auto",
        }}
      >
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 0,
              }}
            >
              <CalendarAll userId={row.uid} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export const AllMembersTable = () => {
  const dispatch = useAppDispatch();
  const companyId = useAppSelector((state) => state.loggedUser.user.companyId);
  const users = useAppSelector((state) => state.allUsers.user).filter(
    (user) => user.companyId === companyId
  );

  React.useEffect(() => {
    dispatch(getLoggedUserData());
    dispatch(getAllUserData());
  }, [dispatch]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>{STRINGS.FIRST_NAME}</TableCell>
            <TableCell align="left">{STRINGS.LAST_NAME}</TableCell>
            <TableCell align="left">{STRINGS.EMAIL}</TableCell>
            <TableCell align="left">{STRINGS.ROLE}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <Row key={row.uid} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
