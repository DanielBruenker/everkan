import { IconButton, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import KanbanCard from './KanbanCard';


const useColumnHeaderStyles = makeStyles({
  columnHeader: {
    background: 'lightgray'
  },
  title: {
    margin: '0px',
    padding: '16px',
    textAlign: 'center'
  },
  columnNameInput: {
    margin: '12px 0 12px 0',
    fontSize: '1.5em',
    width: '200px', '&:focus': {
      outline: 'none !important',
      border: '2px solid skyblue'
    }
  }
});

const useStyles = makeStyles({
  column: {
    width: '300px',
    background: 'white',
    height: '80%',
    margin: '0 8px 0 8px'
  },
  columnDragging: {
    width: '300px',
    border: '3px solid skyblue',
    height: '80%',
    background: 'white'
  },
  taskList: {
    padding: '8px',
    minHeight: '80%',
    background: 'white',
    transition: 'background-color 0.2s ease'
  },
  taskListOnDraggingOver: {
    padding: '8px',
    background: 'skyblue',
    minHeight: '80%',
    transition: 'background-color 0.2s ease'
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
  index: number,
  onColumnTitleChange: any
}


const KanbanColumnHeader = (
  props: {
    columnTitle: string,
    onColumnTitleChange: any
  }) => {

  const classes = useColumnHeaderStyles();

  return (
    <div className={classes.columnHeader}>
      <h2 className={classes.title}>
        {props.columnTitle}</h2>
    </div>
  );
};


const KanbanColumn = function Column(props: ColumnPropTypes) {

  const classes = useStyles();

  const onColumnTitleChange = (event: any) => {
    props.onColumnTitleChange(props.column, event.target.value);
  };

  return (
    <Draggable draggableId={'column-' + props.column.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className={snapshot.isDragging ? classes.columnDragging : classes.column}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}>
          <KanbanColumnHeader
            onColumnTitleChange={onColumnTitleChange}
            columnTitle={props.column.title}/>
          <Droppable droppableId={'column-' + props.column.id} type="card">
            {(provided, snapshot) => (
              <div
                className={snapshot.isDraggingOver ? classes.taskListOnDraggingOver : classes.taskList}
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
          <div style={{ textAlign: 'center' }}>
            <IconButton>
              <AddIcon fontSize="large"/>
            </IconButton>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanColumn;