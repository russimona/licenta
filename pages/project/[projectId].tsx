import { CardItem } from "@/components/Board/CardItem";
import { Navbar } from "@/components/Navbar/navbar";
import { Colors } from "@/utils/colors";
import { ITaskStatus } from "@/utils/interface";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { makeStyles } from "tss-react/mui";
import { ModalAddTicket } from "@/components/Modal/ModalAddTicket/ModalAddTicket";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/core/store";
import { getAllProjectData } from "@/redux/getAllProjects/slice";
import { onDragEnd } from "@/utils/functions";
import { ReduxThunkStatuses } from "@/utils/reduxThunkStatuses";

function App() {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const { projectId } = router.query;
  const project = useAppSelector((state) => state.projects.project).filter(
    (item) => item.id === projectId
  )[0];
  const projectStatus = useAppSelector((state) => state.projects.status);

  const taskStatus = project?.taskStatus
    ? project?.taskStatus
    : ([] as ITaskStatus[]);

  const [columns, setColumns] = useState(taskStatus);
  const { classes } = useStyles({
    numberColumns: taskStatus ? Object.keys(taskStatus).length : 0,
  });

  useEffect(() => {
    dispatch(getAllProjectData());
  }, [dispatch]);

  useEffect(() => {
    projectStatus === ReduxThunkStatuses.FULFILLED && setColumns(taskStatus);
  }, [projectStatus]);

  return (
    <div className={classes.background}>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ModalAddTicket isOpen={isOpen} setIsOpen={setIsOpen} />
        <Typography
          variant="h1"
          style={{ marginTop: "100px", textAlign: "center", width: "100vw" }}
        >
          {project?.projectName ?? ""}
        </Typography>
        <div className={classes.box}>
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {columns &&
              Object.entries(columns).map(([columnId, column], index) => {
                return (
                  <div key={columnId}>
                    <Typography variant="h4" className={classes.columnsName}>
                      {column.name}
                    </Typography>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              background: snapshot.isDraggingOver
                                ? "#163a4d"
                                : "#3c5d6e",
                            }}
                            className={classes.columnsContent}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                      >
                                        <CardItem
                                          data={item}
                                          index={index}
                                          numberColumns={
                                            taskStatus
                                              ? Object.keys(taskStatus).length
                                              : 0
                                          }
                                        />
                                      </div>
                                    );
                                  }}
                                </Draggable>
                              );
                            })}
                            <Button
                              className={classes.addNewTicket}
                              onClick={() => {
                                setIsOpen(true);
                              }}
                            >
                              <AddIcon />
                            </Button>
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                );
              })}
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}

export default App;

const useStyles = makeStyles<{ numberColumns: number }>()(
  (theme, { numberColumns }) => ({
    background: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: theme.palette.common.white,
      height: "100vh",
      width: "100vw",
    },
    box: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignContent: "center",
      margin: "auto",
      columnGap: theme.spacing(1),
      width: "fit-content",
    },
    flexColumn: {
      display: "flex",
      flexDirection: "column",
    },
    columns: {
      paddingTop: theme.spacing(0.5),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: theme.palette.primary.main,
    },
    columnsContent: {
      width: `${95 / numberColumns}vw`,
      minHeight: "75vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "10px",
      border: `${theme.spacing(0.1)} solid ${theme.palette.secondary.light}`,
      boxShadow: `2px 2px 5px 0px ${theme.palette.common.black}`,
      overflowX: "auto",
      maxHeight: "75vh",
    },
    columnsName: {
      paddingTop: theme.spacing(0.5),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      border: `${theme.spacing(0.1)} inset ${theme.palette.primary.main}`,
      color: theme.palette.secondary.light,
      backgroundColor: Colors.background,
      height: "40px",
      justifyContent: "center",
    },
    addNewTicket: {
      background: "transparent",
      color: "transparent",
      marginTop: "0px",
      width: "95%",
      ":hover": {
        background: "#163a4d",
        borderRadius: theme.spacing(1),
      },
    },
  })
);
