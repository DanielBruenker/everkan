import React, { useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../store';
import { kanbanBoardActions } from "../index";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard: React.FC = () => {
  const board = useTypedSelector((state) => state.kanbanBoard);
  const dispatch = useDispatch();

  useEffect(() => {}, [board]);

  /**
   * This function will be called if any object was dragged.
   *
   * @param result
   */
  const onDragEnd = (result: {
    destination?: { droppableId: string; index: number };
    source: { droppableId: string; index: number };
    type: string;
    draggableId: string;
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
      dispatch(
        kanbanBoardActions.moveColumn({
          board: board,
          source: source,
          destination: destination,
          draggableId: draggableId,
        })
      );
      return;
    }

    if (type === "card") {
      dispatch(
        kanbanBoardActions.moveCard({
          board: board,
          source: source,
          destination: destination,
          draggableId: draggableId,
        })
      );
      return;
    }
  };

  /**
   * This function renders the Kanban-Board columns.
   *
   */
  const renderColumns = () => {
    return board.columns.map((column: any, index: number) => {
      return (
        <KanbanColumn
          key={column.id}
          column={column}
          index={index}
          onColumnTitleChange={(event) => console.log(event)}
        />
      );
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided: any) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="kanban-board"
          >
            {renderColumns()}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default KanbanBoard;
