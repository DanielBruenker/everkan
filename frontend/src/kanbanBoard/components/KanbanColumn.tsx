import { Grid, IconButton } from "@material-ui/core";
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

const KanbanColumnHeader = (props: KanbanColumnHeaderProps) => {
  return (
    <div className="columnHeader">
      <h2 className="title">{props.columnTitle}</h2>
    </div>
  );
};

const KanbanColumn = function Column(props: KanbanColumnProps) {
  const dispatch = useDispatch();

  const handleOnClickOnAddNewKanbanCardDialog = (event) => {
    dispatch(
      kanbanBoardUIActions.showAddNewKanbanCardDialog({ column: props.column })
    );
  };

  const renderCards = () => {
    return props.column.cards.map((card: any, index: number) => (
      <KanbanCard key={card.id} card={card} index={index} />
    ));
  };

  return (
    <Draggable draggableId={"column-" + props.column.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className={snapshot.isDragging ? "columnDragging" : "column"}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <KanbanColumnHeader columnTitle={props.column.title} />
          <Droppable droppableId={"column-" + props.column.id} type="card">
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
