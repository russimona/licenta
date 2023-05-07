// import { ICardItem } from "../../utils/interface";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// import { useEffect, useState } from "react";
// import { CardItem } from "@/components/Kanban/CardItem";
// import { makeStyles } from "tss-react/mui";
// import { Navbar } from "@/components/Navbar/navbar";
// import { Colors } from "@/utils/colors";
// import { Typography } from "@mui/material";

// function createGuidId() {
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
//     var r = (Math.random() * 16) | 0,
//       v = c == "x" ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// }

// export default function Home() {
//   const [ready, setReady] = useState(false);

//   const { classes } = useStyles();
// const [boardData, setBoardData] = useState<ICardItem[]>([
//   {
//     name: "Backlog",
//     items: [
//       {
//         id: "1",
//         priority: 0,
//         title: "Company website redesign.",
//         chat: 1,
//         attachment: 2,
//         assignees: [
//           {
//             avt: "https://randomuser.me/api/portraits/men/75.jpg",
//           },
//         ],
//       },
//       {
//         id: "2",
//         priority: 2,
//         title: "Mobile app login process prototype.",
//         chat: 10,
//         attachment: 4,
//         assignees: [
//           {
//             avt: "https://randomuser.me/api/portraits/men/67.jpg",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "In Progress",
//     items: [
//       {
//         id: " 3",
//         priority: 1,
//         title: "Research and strategy for upcoming project.",
//         chat: 0,
//         attachment: 3,
//         assignees: [
//           {
//             avt: "https://randomuser.me/api/portraits/men/79.jpg",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "In Review",
//     items: [
//       {
//         id: "4",
//         priority: 2,
//         title: "Dashboard layout redesign.",
//         chat: 13,
//         attachment: 2,
//         assignees: [
//           {
//             avt: "https://randomuser.me/api/portraits/men/75.jpg",
//           },
//         ],
//       },
//       {
//         id: "5",
//         priority: 0,
//         title: "Social media posts",
//         chat: 0,
//         attachment: 0,
//         assignees: [
//           {
//             avt: "https://randomuser.me/api/portraits/men/68.jpg",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     name: "Completed",
//     items: [
//       {
//         id: "6",
//         priority: 0,
//         title: "Review client spec document and give feedback.",
//         chat: 13,
//         attachment: 2,
//         assignees: [
//           {
//             avt: "https://randomuser.me/api/portraits/men/75.jpg",
//           },
//         ],
//       },
//       {
//         id: "7",
//         priority: 1,
//         title: "Navigation designs",
//         chat: 0,
//         attachment: 0,
//         assignees: [
//           {
//             avt: "https://randomuser.me/api/portraits/men/68.jpg",
//           },
//         ],
//       },
//       {
//         id: "8",
//         priority: 2,
//         title: "Create style guide based on previous feedback",
//         chat: 5,
//         attachment: 2,
//         assignees: [
//           {
//             avt: "https://randomuser.me/api/portraits/men/64.jpg",
//           },
//         ],
//       },
//     ],
//   },
// ]);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedBoard, setSelectedBoard] = useState(0);

//   useEffect(() => {
//     if (process.browser) {
//       setReady(true);
//     }
//   }, []);

//   const onDragEnd = (re) => {
//     if (!re.destination) return;
//     let newBoardData = boardData;
//     var dragItem =
//       newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
//     newBoardData[parseInt(re.source.droppableId)].items.splice(
//       re.source.index,
//       1
//     );
//     newBoardData[parseInt(re.destination.droppableId)].items.splice(
//       re.destination.index,
//       0,
//       dragItem
//     );
//     setBoardData(newBoardData);
//   };

//   const onTextAreaKeyPress = (e) => {
//     if (e.keyCode === 13) {
//       //Enter
//       const val = e.target.value;
//       if (val.length === 0) {
//         setShowForm(false);
//       } else {
//         const boardId = e.target.attributes["data-id"].value;
//         const item = {
//           id: createGuidId(),
//           title: val,
//           priority: 0,
//           chat: 0,
//           attachment: 0,
//           assignees: [{ avt: "" }],
//         };
//         let newBoardData = boardData;
//         newBoardData[boardId].items.push(item);
//         setBoardData(newBoardData);
//         setShowForm(false);
//         e.target.value = "";
//       }
//     }
//   };

//   return (
//     <div className={classes.background}>
//       <Navbar />
//       {ready && (
//         <DragDropContext onDragEnd={onDragEnd}>
//           <div className={classes.box}>
//             {boardData.map((board, bIndex) => {
//               return (
//                 <div key={board.name}>
//                   <Droppable droppableId={bIndex.toString()}>
//                     {(provided, snapshot) => (
//                       <div {...provided.droppableProps} ref={provided.innerRef}>
//                         <div className={classes.flexColumn}>
//                           <Typography variant="h3" className={classes.columns}>
//                             {board.name}
//                           </Typography>

//                           <div>
//                             {board.items.length > 0 &&
//                               board.items.map((item, iIndex) => {
//                                 return (
//                                   <CardItem
//                                     key={item.id}
//                                     data={item}
//                                     index={iIndex}
//                                   />
//                                 );
//                               })}
//                             {provided.placeholder}
//                           </div>

//                           {showForm && selectedBoard === bIndex ? (
//                             <div className="p-3">
//                               <textarea
//                                 rows={3}
//                                 placeholder="Task info"
//                                 data-id={bIndex}
//                                 onKeyDown={(e) => onTextAreaKeyPress(e)}
//                               />
//                             </div>
//                           ) : (
//                             <button
//                               onClick={() => {
//                                 setSelectedBoard(bIndex);
//                                 setShowForm(true);
//                               }}
//                             >
//                               <span>Add task</span>
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </Droppable>
//                 </div>
//               );
//             })}
//           </div>
//         </DragDropContext>
//       )}
//     </div>
//   );
// }

// const useStyles = makeStyles()((theme) => ({
//   background: {
//     display: "flex",
//     justifyContent: "center",
//     backgroundColor: theme.palette.common.white,
//     height: "100vh",
//     width: "100vw",
//   },
//   box: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     columnGap: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.light,
//     height: "80vh",
//     overflowX: "auto",
//     padding: `${theme.spacing(4)} ${theme.spacing(4)} ${theme.spacing(
//       4
//     )} ${theme.spacing(4)}`,
//     marginTop: "100px",
//     width: "fit-content",
//     border: `${theme.spacing(0.1)} solid ${theme.palette.secondary.light}`,
//     borderRadius: theme.spacing(1),
//     boxShadow: `2px 2px 5px 0px ${theme.palette.common.black}`,
//   },
//   flexColumn: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   columns: {
//     justifyContent: "center",
//     display: "flex",
//     marginBottom: theme.spacing(2),
//     background: theme.palette.common.white,
//     width: "300px",
//     height: "30px",
//     border: `${theme.spacing(0.1)} solid ${theme.palette.secondary.light}`,
//     borderRadius: theme.spacing(1),
//     boxShadow: `2px 2px 5px 0px ${theme.palette.common.black}`,
//     paddingTop: theme.spacing(0.5),
//   },
// }));

// import { CardItem } from "@/components/Kanban/CardItem";

// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import { useEffect, useState } from "react";
// import { ICardItem } from "@/utils/interface";
// import { makeStyles } from "tss-react/mui";

// function createGuidId() {
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
//     var r = (Math.random() * 16) | 0,
//       v = c == "x" ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// }

// export default function Home() {
//   const [ready, setReady] = useState(false);
//   const [boardData, setBoardData] = useState<ICardItem[]>([
//     {
//       name: "Backlog",
//       items: [
//         {
//           id: "1",
//           priority: 0,
//           title: "Company website redesign.",
//           chat: 1,
//           attachment: 2,
//           assignees: [
//             {
//               avt: "https://randomuser.me/api/portraits/men/75.jpg",
//             },
//           ],
//         },
//         {
//           id: "2",
//           priority: 2,
//           title: "Mobile app login process prototype.",
//           chat: 10,
//           attachment: 4,
//           assignees: [
//             {
//               avt: "https://randomuser.me/api/portraits/men/67.jpg",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       name: "In Progress",
//       items: [
//         {
//           id: " 3",
//           priority: 1,
//           title: "Research and strategy for upcoming project.",
//           chat: 0,
//           attachment: 3,
//           assignees: [
//             {
//               avt: "https://randomuser.me/api/portraits/men/79.jpg",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       name: "In Review",
//       items: [
//         {
//           id: "4",
//           priority: 2,
//           title: "Dashboard layout redesign.",
//           chat: 13,
//           attachment: 2,
//           assignees: [
//             {
//               avt: "https://randomuser.me/api/portraits/men/75.jpg",
//             },
//           ],
//         },
//         {
//           id: "5",
//           priority: 0,
//           title: "Social media posts",
//           chat: 0,
//           attachment: 0,
//           assignees: [
//             {
//               avt: "https://randomuser.me/api/portraits/men/68.jpg",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       name: "Completed",
//       items: [
//         {
//           id: "6",
//           priority: 0,
//           title: "Review client spec document and give feedback.",
//           chat: 13,
//           attachment: 2,
//           assignees: [
//             {
//               avt: "https://randomuser.me/api/portraits/men/75.jpg",
//             },
//           ],
//         },
//         {
//           id: "7",
//           priority: 1,
//           title: "Navigation designs",
//           chat: 0,
//           attachment: 0,
//           assignees: [
//             {
//               avt: "https://randomuser.me/api/portraits/men/68.jpg",
//             },
//           ],
//         },
//         {
//           id: "8",
//           priority: 2,
//           title: "Create style guide based on previous feedback",
//           chat: 5,
//           attachment: 2,
//           assignees: [
//             {
//               avt: "https://randomuser.me/api/portraits/men/64.jpg",
//             },
//           ],
//         },
//       ],
//     },
//   ]);
//   const [showForm, setShowForm] = useState(false);
//   const [selectedBoard, setSelectedBoard] = useState(0);
//   const { classes } = useStyles();
//   useEffect(() => {
//     if (process.browser) {
//       setReady(true);
//     }
//   }, []);

//   const onDragEnd = (re) => {
//     if (!re.destination) return;
//     let newBoardData = boardData;
//     var dragItem =
//       newBoardData[parseInt(re.source.droppableId)].items[re.source.index];
//     newBoardData[parseInt(re.source.droppableId)].items.splice(
//       re.source.index,
//       1
//     );
//     newBoardData[parseInt(re.destination.droppableId)].items.splice(
//       re.destination.index,
//       0,
//       dragItem
//     );
//     setBoardData(newBoardData);
//   };

//   const onTextAreaKeyPress = (e) => {
//     if (e.keyCode === 13) {
//       //Enter
//       const val = e.target.value;
//       if (val.length === 0) {
//         setShowForm(false);
//       } else {
//         const boardId = e.target.attributes["data-id"].value;
//         const item = {
//           id: createGuidId(),
//           title: val,
//           priority: 0,
//           chat: 0,
//           attachment: 0,
//           assignees: [],
//         };
//         let newBoardData = boardData;
//         newBoardData[boardId].items.push(item);
//         setBoardData(newBoardData);
//         setShowForm(false);
//         e.target.value = "";
//       }
//     }
//   };

//   return (
//     <div className={classes.background}>
//       {ready && (
//         <DragDropContext onDragEnd={onDragEnd}>
//           <div className={classes.box}>
//             {boardData.map((board, bIndex) => {
//               return (
//                 <div key={board.name}>
//                   <Droppable droppableId={bIndex.toString()}>
//                     {(provided, snapshot) => (
//                       <div {...provided.droppableProps} ref={provided.innerRef}>
//                         <div
//                           className={`bg-gray-100 rounded-md shadow-md
//                             flex flex-col relative overflow-hidden
//                             ${snapshot.isDraggingOver && "bg-green-100"}`}
//                         >
//                           <span
//                             className="w-full h-1 bg-gradient-to-r from-pink-700 to-red-200
//                           absolute inset-x-0 top-0"
//                           ></span>
//                           <h4 className=" p-3 flex justify-between items-center mb-2">
//                             <span className="text-2xl text-gray-600">
//                               {board.name}
//                             </span>
//                           </h4>

//                           <div
//                             className="overflow-y-auto overflow-x-hidden h-auto"
//                             style={{ maxHeight: "calc(100vh - 290px)" }}
//                           >
//                             {board.items.length > 0 &&
//                               board.items.map((item, iIndex) => {
//                                 return (
//                                   <CardItem
//                                     key={item.id}
//                                     data={item}
//                                     index={iIndex}
//                                   />
//                                 );
//                               })}
//                             {provided.placeholder}
//                           </div>

//                           {showForm && selectedBoard === bIndex ? (
//                             <div className="p-3">
//                               <textarea
//                                 className="border-gray-300 rounded focus:ring-purple-400 w-full"
//                                 rows={3}
//                                 placeholder="Task info"
//                                 data-id={bIndex}
//                                 onKeyDown={(e) => onTextAreaKeyPress(e)}
//                               />
//                             </div>
//                           ) : (
//                             <button
//                               className="flex justify-center items-center my-3 space-x-2 text-lg"
//                               onClick={() => {
//                                 setSelectedBoard(bIndex);
//                                 setShowForm(true);
//                               }}
//                             >
//                               <span>Add task</span>
//                             </button>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </Droppable>
//                 </div>
//               );
//             })}
//           </div>
//         </DragDropContext>
//       )}
//     </div>
//   );
// }

// const useStyles = makeStyles()((theme) => ({
//   background: {
//     display: "flex",
//     justifyContent: "center",
//     backgroundColor: theme.palette.common.white,
//     height: "100vh",
//     width: "100vw",
//   },
//   box: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "center",
//     columnGap: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.light,
//     height: "80vh",
//     overflowX: "auto",
//     padding: `${theme.spacing(4)} ${theme.spacing(4)} ${theme.spacing(
//       4
//     )} ${theme.spacing(4)}`,
//     marginTop: "100px",
//     width: "fit-content",
//     border: `${theme.spacing(0.1)} solid ${theme.palette.secondary.light}`,
//     borderRadius: theme.spacing(1),
//     boxShadow: `2px 2px 5px 0px ${theme.palette.common.black}`,
//   },
//   flexColumn: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   columns: {
//     justifyContent: "center",
//     display: "flex",
//     marginBottom: theme.spacing(2),
//     background: theme.palette.common.white,
//     width: "300px",
//     height: "30px",
//     border: `${theme.spacing(0.1)} solid ${theme.palette.secondary.light}`,
//     borderRadius: theme.spacing(1),
//     boxShadow: `2px 2px 5px 0px ${theme.palette.common.black}`,
//     paddingTop: theme.spacing(0.5),
//   },
// }));

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
import { IColumnsDrag } from "@/utils/interface";
import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

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
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Jira Board</h1>
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
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
                            width: 300,
                            minHeight: 500,
                          }}
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

                                      {/* {item.content} */}
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
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
