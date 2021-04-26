import { IconButton, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import api from '../api';
import { moveCard, moveColumn } from '../utilities/KanbanBoardUtils';
import KanbanColumn from './KanbanColumn';


const useStyles = makeStyles({
  container: {
    display: 'flex',
    height: '100vh'
  },
  containerDraggingOver: {
    display: 'flex'
  },
  addNewColumnContainer: {
    width: '300px',
    background: 'lightgray',
    textAlign: 'center',
    padding: '12px 0 12px 0',
    marginLeft: '8px'
  },
  columnNameInput: {
    margin: '',
    fontSize: '1.5em',
    width: '200px', '&:focus': {
      outline: 'none !important',
      border: '2px solid skyblue'
    }
  }
});


const KanbanBoard = (props: { boardID: number }) => {

  // Columns of the kanban board with tasks
  const [columns, setColumns] = useState([]);

  const [toggle, setToggle] = useState(true);

  // Name of the new Column
  const [name, setName] = useState('');

  // css - classes
  const classes = useStyles();

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/board/' + props.boardID)
      .then(res => res.json())
      .then((data) => {
        setColumns(data.columns);
      });
  }, []);


  /**
   * This function will be called if any object was dragged.
   *
   * @param result
   */
  const onDragEnd = (result: any) => {

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

    if (type === 'column') {
      const updatedColumns = moveColumn(columns, source, destination, draggableId);

      api.kanbanColumn.updateColumns(updatedColumns);

      // @ts-ignore
      setColumns(updatedColumns);
      return;
    }

    if (type === 'card') {
      const updatedColumns = moveCard(columns, source, destination, draggableId);

      api.kanbanColumn.updateColumns(updatedColumns);

      // @ts-ignore
      setColumns(updatedColumns);
      return;
    }
  };

  const onColumnTitleChange = () => {};

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            className={snapshot.isDraggingOver ? classes.containerDraggingOver : classes.container}
            ref={provided.innerRef}>
            {columns.map((column: any, index: number) => {
              return <KanbanColumn
                key={column.id}
                column={column}
                index={index}
                onColumnTitleChange={onColumnTitleChange}
              />;
            })}
            {provided.placeholder}
            <div style={{ textAlign: 'center', width: '300px' }}>
              {(toggle) ? (
                <IconButton onClick={() => setToggle(false)}>
                  <AddIcon fontSize="large"/>
                </IconButton>
              ) : (
                <div className={classes.addNewColumnContainer}>
                  <input
                    className={classes.columnNameInput} type="text"
                    onChange={event => setName(event.target.value)}
                    value={name}
                    autoFocus
                    onKeyDown={(event) => {
                      if (event.key === 'Enter') {
                        setToggle(true);
                        event.preventDefault();
                        event.stopPropagation();
                      } else if (event.key === 'Escape') {
                        setToggle(true);
                      }
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default KanbanBoard;

