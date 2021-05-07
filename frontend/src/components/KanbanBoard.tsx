import React from 'react';
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { boardActions } from "../actions/BoardActions";
import KanbanColumn from "./KanbanColumn/KanbanColumn";


const KanbanBoard = (props) => {
  /**
   * This function will be called if any object was dragged.
   *
   * @param result
   */
  const onDragEnd = (
    result: {
      destination? : {droppableId: string, index: number},
      source :  {droppableId: string, index: number},
      type: string
      draggableId: string
    }): void => {

    const { destination, source, type, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      props.moveColumn(props.board, source, destination, draggableId);
      return;
    }

    if (type === "card") {
      props.moveCard(props.board, source, destination, draggableId);
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided: any, snapshot: any) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="column-container"
          >
            {props.board.columns.map((column: any, index: number) => {
              return (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  index={index}
                  onColumnTitleChange={(event) => console.log(event)}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

function mapState(state) {
  const { board } = state;
  return { board };
}

const actionCreators = {
  moveColumn: boardActions.moveColumn,
  moveCard: boardActions.moveCard,
};

const connectedKanbanBoard = connect(mapState, actionCreators)(KanbanBoard);
export { connectedKanbanBoard as KanbanBoard };
