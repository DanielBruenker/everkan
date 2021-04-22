import { makeStyles } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import KanbanCard from './KanbanCard';

const useStyles = makeStyles({
  column: {
    width: '300px',
    background: 'white',
    margin: '0 8px 0 8px'
  },
  columnDragging: {
    width: '300px',
    border: '3px solid skyblue',
    background: 'white',
    margin: '0 8px 0 8px'
  },
  title: {
    padding: '8px',
    textAlign: 'center'
  },
  taskList: {
    padding: '8px',
    height: '100%',
    background: 'white',
    transition: 'background-color 0.2s ease',
  },
  taskListOnDraggingOver:{
    padding: '8px',
    height: '100%',
    background: 'skyblue',
    transition: 'background-color 0.2s ease',
  }
});

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
  index: number
}

const KanbanColumn = function Column(props: ColumnPropTypes) {

  const classes = useStyles();

  return (
    <Draggable draggableId={'column-' + props.column.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className={snapshot.isDragging ? classes.columnDragging : classes.column}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          <div>
            <h2 className={classes.title}>{props.column.title}</h2>
          </div>
          <Droppable droppableId={'column-' + props.column.id} type="card">
            {(provided, snapshot) => (
              <div
                className={snapshot.isDraggingOver ? classes.taskListOnDraggingOver : classes.taskList}
                ref={provided.innerRef}
                {...provided.droppableProps}>
                {props.column.cards.map((card: any, index: number) => <KanbanCard key={card.id} card={card} index={index} />)}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default KanbanColumn;