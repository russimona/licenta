import { Box, Typography } from "@mui/material";
import { makeStyles } from "tss-react/mui";

export const FreeDaysCard = () => {
  const { classes } = useStyles();
  return (
    <Box className={classes.box}>
      <Typography variant="h3">
        First day : <span className={classes.span}>12.12.2000</span>
      </Typography>
      <Typography variant="h3">
        Total days off : <span className={classes.span}>{23}</span>
      </Typography>
      <Typography variant="h3">
        Remaining days off : <span className={classes.span}>{10}</span>
      </Typography>
    </Box>
  );
};

const useStyles = makeStyles()((theme) => ({
  box: {
    display: "flex",
    flexDirection: "column",
    rowGap: theme.spacing(1),
    height: "fit-content",
    width: "fit-content",
    background: theme.palette.common.white,
    alignItems: "center",
    margin: "auto",
    boxShadow: `1px 1px 5px 0px ${theme.palette.primary.light}`,
    borderRadius: "10px",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
    padding: `${theme.spacing(2)} ${theme.spacing(10)} ${theme.spacing(
      2
    )} ${theme.spacing(10)}`,
  },
  span: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: "bold",
  },
}));
