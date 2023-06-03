import { Navbar } from "@/components/Navbar/navbar";
import { STRINGS } from "@/utils/strings";
import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { OptionBar } from "@/components/OptionBar/OptionBar";
import { makeStyles } from "tss-react/mui";
import AddNewEmployee from "@/components/Employee/AddNewEmployee";
import { useAppDispatch } from "@/core/store";
import { addUserBeforeSignUp } from "@/redux/userBeforeSignUp/slice";
import { IUserBeforeSignUpData } from "@/services/addUserBeforeSignup";

function App() {
  const { classes } = useStyles();
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [numberOfFreeDays, setNumberOfFreeDays] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const addNewMemberHandler = () => {
    if (
      role.length === 0 ||
      email.length === 0 ||
      firstName.length === 0 ||
      lastName.length === 0 ||
      numberOfFreeDays === 0
    ) {
      setError(true);
    } else {
      const companyId = sessionStorage.getItem("companyId") ?? "";
      dispatch(
        addUserBeforeSignUp({
          role,
          email,
          firstName,
          lastName,
          numberOfFreeDays,
          companyId,
        } as IUserBeforeSignUpData)
      ).then(() => {
        setRole("");
        setEmail("");
        setFirstName("");
        setLastName("");
        setNumberOfFreeDays(0);
      });
    }
  };

  return (
    <div className={classes.background}>
      <Navbar />
      <OptionBar />
      <div className={classes.header}>
        <Typography variant="h1" className={classes.title}>
          {STRINGS.ADD_MEMBERS}
        </Typography>
      </div>
      <AddNewEmployee
        role={role}
        setRole={setRole}
        setEmail={setEmail}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setNumberOfFreeDays={setNumberOfFreeDays}
        error={error}
        setError={setError}
        success={success}
        setSuccess={setSuccess}
      />
      <Button className={classes.button} onClick={addNewMemberHandler}>
        {STRINGS.ADD_MEMBERS}
      </Button>
    </div>
  );
}

export default App;

const useStyles = makeStyles()((theme) => ({
  background: {
    backgroundColor: theme.palette.common.white,
    height: "100vh",
    width: "100vw",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: "100px",
    alignContent: "center",
    marginLeft: "15vw",
  },
  title: {
    textAlign: "center",
    alignSelf: "center",
  },
  button: {
    width: "300px",
    display: "flex",
    alignItems: "center",
    margin: "auto",
    marginLeft: "calc(38vw + 150px )",
    marginTop: theme.spacing(10),
    backgroundColor: `${theme.palette.primary.main}!important`,
  },
}));
