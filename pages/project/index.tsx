const tasks = [
  {
    id: "1",
    content: "First task",
    asignee: "RS",
    storyPoints: 9,
    title: "Task1",
  },
  {
    id: "2",
    content: "Second task",
    asignee: "RS",
    storyPoints: 9,
    title: "Task2",
  },
  {
    id: "3",
    content: "Third task",
    asignee: "RS",
    storyPoints: 9,
    title: "Task3",
  },
  {
    id: "4",
    content: "Fourth task",
    asignee: "RS",
    storyPoints: 9,
    title: "Task4",
  },
  {
    id: "5",
    content: "Fifth task",
    asignee: "RS",
    storyPoints: 9,
    title: "Task5",
  },
];

import { CardItem } from "@/components/Kanban/CardItem";
import { Navbar } from "@/components/Navbar/navbar";
import { IColumnsDrag } from "@/utils/interface";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { makeStyles } from "tss-react/mui";

const taskStatus = {
  requested: {
    name: "Requested",
    items: tasks,
  },
  toDo: {
    name: "To do",
    items: [],
  },
  inProgress: {
    name: "In Progress",
    items: [],
  },
  done: {
    name: "Done",
    items: [],
  },
};

const onDragEnd = (
  result: DropResult,
  columns: IColumnsDrag,
  setColumns: React.Dispatch<React.SetStateAction<IColumnsDrag>>
) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
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
    const column = columns[source.droppableId];
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

function App() {
  const [columns, setColumns] = useState(taskStatus);
  const { classes } = useStyles();
  return (
    <div className={classes.background}>
      <Navbar />
      <Typography>Licenta V1.0</Typography>
      <div className={classes.box}>
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div className={classes.columns} key={columnId}>
                <h2>{column.name}</h2>

                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          background: snapshot.isDraggingOver
                            ? "lightblue"
                            : "lightgrey",
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
                                    <CardItem data={item} index={index} />
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
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
  );
}

export default App;

const useStyles = makeStyles()((theme) => ({
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
    columnGap: theme.spacing(1),
    height: "80vh",
    marginTop: "100px",
    width: "fit-content",
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
  columns: {
    borderRadius: theme.spacing(1),
    paddingTop: theme.spacing(0.5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  columnsContent: {
    width: "320px",
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "10px",
    border: `${theme.spacing(0.1)} solid ${theme.palette.secondary.light}`,
    boxShadow: `2px 2px 5px 0px ${theme.palette.common.black}`,
    overflowX: "auto",
    maxHeight: "70vh",
  },
}));
