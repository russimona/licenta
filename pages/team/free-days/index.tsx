import { Navbar } from "@/components/Navbar/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { makeStyles } from "tss-react/mui";
import "react-full-year-scheduler/dist/style.css";
import { Button, FormControl, InputLabel, NativeSelect } from "@mui/material";
import { Calendar } from "@/components/free-days/FreeDaysCalendar";
import { FreeDaysCard } from "@/components/free-days/FreeDaysCard";
import { STRINGS } from "@/utils/strings";

export default function Home() {
  const { classes } = useStyles();

  return (
    <ProtectedRoute>
      <Navbar />
      <div className={classes.background}>
        <FreeDaysCard />
        <Calendar />
        <div className={classes.box}>
          <FormControl className={classes.selectFreeDay}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              {STRINGS.SELECT_TYPE_OF_FREE_DAYS}
            </InputLabel>
            <NativeSelect
              defaultValue={10}
              inputProps={{
                name: "FREE DAYS",
                id: "uncontrolled-native",
              }}
            >
              <option value={10}>{STRINGS.VACANTION}</option>
              <option value={20}>{STRINGS.UNPAID}</option>
              <option value={30}>{STRINGS.SICK}</option>
            </NativeSelect>
          </FormControl>
          <button className={classes.button}>Send free days request</button>
        </div>
      </div>
    </ProtectedRoute>
  );
}

const useStyles = makeStyles()((theme) => ({
  background: {
    backgroundColor: theme.palette.secondary.light,
    height: "100vh",
    width: "100vw",
    paddingTop: "70px",
    overflowX: "hidden",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  selectFreeDay: {
    width: "30vw",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(2),
    columnGap: theme.spacing(5),
    justifyContent: "center",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
    padding: `${theme.spacing(0.5)} ${theme.spacing(5)} ${theme.spacing(
      0.5
    )} ${theme.spacing(5)} `,
    fontSize: "16px",
    borderRadius: "5px",

    ":hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.light,
    },
  },
}));
