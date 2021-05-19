import { Grid, IconButton } from "@material-ui/core";
import React from 'react';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { kanbanBoardUIActions } from "../index";
import KanbanCard from "./KanbanCard";

import AddIcon from "@material-ui/icons/Add";

import "./KanbanColumn.css";

import { KanbanColumn as KanbanColumnType } from "../../types";

interface KanbanColumnProps {
  column: KanbanColumnType;
  index: number;
  onColumnTitleChange: any;
}

interface KanbanColumnHeaderProps {
  columnTitle: string;
}

const KanbanColumnHeader: React.FC<KanbanColumnHeaderProps> = ({
  columnTitle,
  children,
}) => {
  return (
    <div className="columnHeader">
      {children}
      <h2 className="title">{columnTitle}</h2>
    </div>
  );
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, index }) => {
  const dispatch = useDispatch();

  const handleOnClickOnAddNewKanbanCardDialog = () => {
    dispatch(
      kanbanBoardUIActions.showAddNewKanbanCardDialog({ column: column })
    );
  };

  const renderCards = () => {
    return column.cards.map((card: any, index: number) => (
      <KanbanCard key={card.id} card={card} index={index} />
    ));
  };

  return (
    <Draggable draggableId={"column-" + column.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={snapshot.isDragging ? "columnDragging" : "column"}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <KanbanColumnHeader columnTitle={column.title} />
          <Droppable droppableId={"column-" + column.id} type="card">
            {(provided, snapshot) => (
              <div
                className={
                  snapshot.isDraggingOver
                    ? "taskListOnDraggingOver"
                    : "taskList"
                }
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {renderCards()}
                {provided.placeholder}
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <IconButton onClick={handleOnClickOnAddNewKanbanCardDialog}>
                    <AddIcon />
                  </IconButton>
                </Grid>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanColumn;
