import { Navbar } from "@/components/Navbar/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { makeStyles } from "tss-react/mui";
import "react-full-year-scheduler/dist/style.css";
import { Calendar } from "@/components/free-days/FreeDaysCalendar";
import { FreeDaysCard } from "@/components/free-days/FreeDaysCard";
import { ColorsMap } from "@/components/free-days/ColorsMap";
import { SelectFreeDaysDropdown } from "@/components/free-days/SelectFreeDaysDropdown";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";

export default function Home() {
  const { classes } = useStyles();
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(""));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(""));
  const [clearSelection, setClearSelection] = useState<boolean>(false);
  const [sendFreeDaysReq, setSendFreeDaysReq] = useState<boolean>(false);

  return (
    <ProtectedRoute>
      <Navbar />
      <div className={classes.background}>
        <SelectFreeDaysDropdown
          startDate={startDate}
          endDate={endDate}
          setClearSelection={setClearSelection}
          setSendFreeDaysReq={setSendFreeDaysReq}
        />
        <div className={classes.calendar}>
          <Calendar
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            clearSelection={clearSelection}
            sendFreeDaysReq={sendFreeDaysReq}
            setClearSelection={setClearSelection}
            setSendFreeDaysReq={setSendFreeDaysReq}
            startDate={startDate}
            endDate={endDate}
          />
        </div>

        <div className={classes.boxCards}>
          <FreeDaysCard />
          <ColorsMap />
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
    overflow: "auto",
  },
  boxCards: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    columnGap: theme.spacing(5),
    justifyContent: "center",
  },
  calendar: {
    fontFamily: "Roboto",
  },
}));
