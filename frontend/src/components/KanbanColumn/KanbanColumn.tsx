import { Draggable, Droppable } from 'react-beautiful-dnd';
import KanbanCard from '../KanbanCard/KanbanCard';

import './KanbanColumn.css';

type ColumnPropTypes = {
  column: {
    id: number,
    title: string,
    cards: {
      id: number,
      title: string,
      description: string
    }[]
  },
  index: number,
  onColumnTitleChange: any
}

const KanbanColumnHeader = (
  props: {
    columnTitle: string,
    onColumnTitleChange: any
  }) => {

  return (
    <div className="columnHeader">
      <h2 className="title">
        {props.columnTitle}</h2>
    </div>
  );
};


const KanbanColumn = function Column(props: ColumnPropTypes) {

  const onColumnTitleChange = (event: any) => {
    props.onColumnTitleChange(props.column, event.target.value);
  };

  return (
    <Draggable draggableId={'column-' + props.column.id} index={props.index}>
      {(provided, snapshot) => (
        <div className={snapshot.isDragging ? "columnDragging" : "column"}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          <KanbanColumnHeader
            onColumnTitleChange={onColumnTitleChange}
            columnTitle={props.column.title}/>
          <Droppable droppableId={'column-' + props.column.id} type="card">
            {(provided, snapshot) => (
              <div className={snapshot.isDraggingOver ? "taskListOnDraggingOver" : "taskList"}
                ref={provided.innerRef}
                {...provided.droppableProps}>
                {props.column.cards.map(
                  (card: any, index: number) =>
                    <KanbanCard key={card.id} card={card} index={index}/>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanColumn;