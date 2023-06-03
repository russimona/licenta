import { CardItem } from "@/components/Board/CardItem";
import { Navbar } from "@/components/Navbar/navbar";
import { Colors } from "@/utils/colors";
import { INewTicket, ITaskStatus } from "@/utils/interface";
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
import { moveTickets } from "@/redux/moveTickets/slice";
import { ModalUpdateTicket } from "@/components/Modal/ModalUpdateTicket/ModalUpdateTicket";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { STRINGS } from "@/utils/strings";
import { ModalAddMember } from "../Modal/ModalAddNewMemberProj/ModalAddMemberProj";
import PersonRemoveOutlinedIcon from "@mui/icons-material/PersonRemoveOutlined";
import { ModalDeleteMember } from "../Modal/ModalDeleteMemberProj copy/ModalDeleteMemberProj";
import { getLoggedUserData } from "@/redux/getLoggedUser/slice";
import { getAllUserData } from "@/redux/getAllUsers/slice";

const ProjectPage = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [edit, setIsEdit] = useState<boolean>(false);
  const router = useRouter();
  const { projectId } = router.query;
  const project = useAppSelector((state) => state.projects.project).filter(
    (item) => item.id === projectId
  )[0];
  const [addMembersOpen, setAddMembersOpen] = useState<boolean>(false);
  const [removeMembersOpen, setRemoveMembersOpen] = useState<boolean>(false);
  const projectStatus = useAppSelector((state) => state.projects.status);
  const allUsers = useAppSelector((state) => state.allUsers.user);
  const [taskStatus, setTaskStatus] = useState<ITaskStatus[]>([]);
  useEffect(() => {
    if (project) {
      setTaskStatus(project?.taskStatus ?? []);
    }
  }, [project]);

  const [columns, setColumns] = useState(taskStatus);
  const [selectedTicket, setSelectedTicket] = useState<INewTicket | null>(null);
  const { classes } = useStyles({
    numberColumns: Object.keys(taskStatus ?? ([] as ITaskStatus[])).length,
  });

  useEffect(() => {
    dispatch(getAllProjectData());
    dispatch(getAllUserData());
  }, [dispatch]);

  useEffect(() => {
    projectStatus === ReduxThunkStatuses.FULFILLED && setColumns(taskStatus);
  }, [taskStatus, projectStatus]);

  useEffect(() => {
    dispatch(getAllProjectData());
    dispatch(getLoggedUserData());
  }, [dispatch]);

  useEffect(() => {
    if (columns.length !== 0) {
      dispatch(
        moveTickets({ projectId: projectId?.toString() ?? "", task: columns })
      );
    }
  }, [columns, dispatch, projectId]);

  const onSelectCardHandler = (item: INewTicket) => {
    setSelectedTicket(item);
    setIsEdit(true);
  };

  const addNewMembersHandler = () => {
    setAddMembersOpen(true);
  };

  const removeMembersHandler = () => {
    setRemoveMembersOpen(true);
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
        {selectedTicket && (
          <ModalUpdateTicket
            isOpen={edit && selectedTicket !== null}
            setIsOpen={setIsEdit}
            data={selectedTicket}
            setSelectedTicket={setSelectedTicket}
            tickets={columns}
          />
        )}
        <ModalAddMember isOpen={addMembersOpen} setIsOpen={setAddMembersOpen} />
        <ModalAddTicket isOpen={isOpen} setIsOpen={setIsOpen} />
        <ModalDeleteMember
          isOpen={removeMembersOpen}
          setIsOpen={setRemoveMembersOpen}
        />
        <Typography
          variant="h1"
          style={{ marginTop: "100px", textAlign: "center", width: "100vw" }}
        >
          {project?.projectName}
        </Typography>
        <Typography
          variant="h5"
          className={classes.addNewMember}
          onClick={addNewMembersHandler}
        >
          <PersonAddAltIcon className={classes.iconAddMember} />
          {STRINGS.ADD_MEMBERS_TO_PROJECT}
        </Typography>
        <Typography
          variant="h5"
          className={classes.deleteMember}
          onClick={removeMembersHandler}
        >
          <PersonRemoveOutlinedIcon className={classes.iconDeleteMember} />
          {STRINGS.REMOVE_MEMBERS_FROM_PROJECT}
        </Typography>
        <div className={classes.box}>
          <DragDropContext
            onDragEnd={(result) => {
              onDragEnd(result, columns, setColumns, allUsers);
            }}
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
                                      onClick={() => onSelectCardHandler(item)}
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
};

export default ProjectPage;
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
    addNewMember: {
      cursor: "pointer",
      float: "right",
      width: "fit-content",
      paddingLeft: "2.5vw",
      color: Colors.darkBlue,
      display: "flex",
      columnGap: theme.spacing(1),
    },
    iconAddMember: {
      height: "20px",
      width: "20px",
      color: Colors.darkBlue,
    },
    iconDeleteMember: {
      height: "20px",
      width: "20px",
      color: Colors.redCalendar,
    },
    deleteMember: {
      cursor: "pointer",
      float: "right",
      width: "fit-content",
      paddingLeft: "2.5vw",
      color: Colors.redCalendar,
      display: "flex",
      columnGap: theme.spacing(1),
    },
  })
);
