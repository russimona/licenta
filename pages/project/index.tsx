import { CardItem } from "@/components/Board/CardItem";
import { Navbar } from "@/components/Navbar/navbar";
import { Colors } from "@/utils/colors";
import { IColumnsDrag } from "@/utils/interface";
import { PRIORITY_CODE } from "@/utils/priorityColors";
import { Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { makeStyles } from "tss-react/mui";
import { ModalAddTicket } from "@/components/Modal/ModalAddTicket/ModalAddTicket";

const tasks = [
  {
    id: "1",
    content: "First task",
    storyPoints: 2,
    title: "Task1",
    asignee: "RM",
    priority: PRIORITY_CODE.HIGH_PRIORITY,
    type: "BUG",
  },
  {
    id: "2",
    content: "Second task",
    storyPoints: 9,
    title: "Task2",
    asignee: "SC",
    priority: PRIORITY_CODE.MEDIUM_PRIORITY,
    type: "BUG",
  },
  {
    id: "3",
    content: "Third task",
    storyPoints: 7,
    title: "Task3",
    asignee: "DC",
    priority: PRIORITY_CODE.LOW_PRIORITY,
    type: "FEAT",
  },
  {
    id: "4",
    content: "Fourth task",
    storyPoints: 3,
    title: "Task4",
    asignee: "RM",
    priority: PRIORITY_CODE.LOW_PRIORITY,
    type: "FEAT",
  },
  {
    id: "5",
    content: "Fifth task",
    storyPoints: 1,
    title: "Task5",
    asignee: "SM",
    priority: PRIORITY_CODE.HIGH_PRIORITY,
    type: "FEAT",
  },
];

const taskStatus = [
  {
    name: "Backlog",
    items: tasks,
  },
  {
    name: "To do",
    items: [],
  },
  {
    name: "In Progress",
    items: [],
  },
  {
    name: "QA",
    items: [],
  },
  {
    name: "Done",
    items: [],
  },
];

function App() {
  const [columns, setColumns] = useState(taskStatus);
  const { classes } = useStyles({
    numberColumns: Object.keys(taskStatus).length,
  });
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const onDragEnd = (
    result: DropResult,
    columns: IColumnsDrag[],
    setColumns: React.Dispatch<React.SetStateAction<IColumnsDrag[]>>
  ) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[parseInt(source.droppableId)];
      const destColumn = columns[parseInt(destination.droppableId)];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[parseInt(source.droppableId)];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

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
          Licenta V1.0
        </Typography>
        <div className={classes.box}>
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
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
                                          Object.keys(taskStatus).length
                                        }
                                      />
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          <Button className={classes.addNewTicket}>
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
