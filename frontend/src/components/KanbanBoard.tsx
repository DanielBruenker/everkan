import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import { boardActions } from "../store/slices/KanbanBoardSlice";
import { RootState } from "../store";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = () => {
  const board = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

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
        boardActions.moveColumn({
          source: source,
          destination: destination,
          draggableId: draggableId,
        })
      );
      return;
    }

    if (type === "card") {
      dispatch(
        boardActions.moveCard({
          source: source,
          destination: destination,
          draggableId: draggableId,
        })
      );
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
            {board.columns.map((column: any, index: number) => {
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

export default KanbanBoard;
