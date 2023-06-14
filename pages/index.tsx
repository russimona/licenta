import { ModalAddNewCompany } from "@/components/Modal/ModalCreateCompany/ModalCreateCompany";
import { Navbar } from "@/components/Navbar/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { getCompanyData } from "@/redux/getCompany/slice";
import { getLoggedUserData } from "@/redux/getLoggedUser/slice";
import { Colors } from "@/utils/colors";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";
import { Avatar, Box, Typography } from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";

export default function Home() {
  const companyId = useAppSelector((state) => state.loggedUser.user.companyId);
  const companyIdState = useAppSelector((state) => state.loggedUser.status);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const company = useAppSelector((state) => state.companyData);

  useEffect(() => {
    dispatch(getLoggedUserData());
  }, [dispatch]);

  useEffect(() => {
    if (companyIdState === ReduxThunkStatuses.FULFILLED) {
      setIsOpen(companyId ? false : true);
      dispatch(getCompanyData(companyId));
    }
  }, [companyId, companyIdState, dispatch]);
  return (
    <ProtectedRoute>
      <>
        <Head>
          <title>WorkEase</title>
          <meta
            name="description"
            title="WorkEase"
            content="Streamline your work, simplify your life"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Navbar />
        <ModalAddNewCompany isOpen={isOpen} setIsOpen={setIsOpen} />
        <Box className={classes.background}>
          <Typography className={classes.title} variant="h1">
            Welcome to {company.company.name}
          </Typography>
          <Avatar
            variant="square"
            src="png_main.png"
            className={classes.avatar}
          />
          <Typography className={classes.subsol} variant="body2">
            You can find us on {company.company.address} or online at{" "}
            <span className={classes.underline}>{company.company.email}</span>
          </Typography>
        </Box>
      </>
    </ProtectedRoute>
  );
}

const useStyles = makeStyles()((theme) => ({
  background: {
    backgroundColor: Colors.backfroundGray,
    height: "100vh",
    width: "100vw",
    paddingTop: "70px",
  },
  title: {
    textAlign: "center",
    paddingTop: "10vh",
  },
  avatar: {
    height: "50vh",
    width: "50vw",
    margin: "auto",
    marginTop: "10vh",
    marginBottom: "10vh",
  },
  underline: {
    textDecoration: "underline",
  },
  subsol: {
    paddingLeft: "30px",
  },
}));
