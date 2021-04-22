import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import KanbanColumn from './KanbanColumn';


const useStyles = makeStyles({
  container: {
    display: 'flex',
    minHeight: '100%'

  },
  containerDraggingOver: {
    height: '100%',
    display: 'flex'
  }
});


const KanbanBoard = (props: {board: any}) => {

  // Columns of the kanban board with tasks
  const [columns, setColumns] = useState(props.board.columns ? props.board.columns : []);

  // KanbanColumn Order of the kanban KanbanBoard
  const [columnOrder, setColumnOrder] = useState([1, 2, 3]);

  // css - classes
  const classes = useStyles();

  /**
   * This function is called when a column is moved.
   * The changed column order will be saved in the columnOrder - state of this component.
   *
   * @param result
   */
  const onColumnDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    // Copy column order from columnOrder - state
    // @ts-ignore
    const newColumnOrder = Array.from(columnOrder);

    // move column to new position
    newColumnOrder.splice(source.index, 1);
    newColumnOrder.splice(destination.index, 0, parseInt(draggableId.slice(-1)));

    // save new column order
    setColumnOrder(newColumnOrder);
    return;
  };

  /**
   * This function removes a card from a column.
   *
   * @param column column
   * @param index position of the card which will be removed
   */
  const removeCardFromColumn = (column: any, index: any) => {
    // @ts-ignore
    const newCards = Array.from(column.cards);

    newCards.splice(index, 1);

    return {
      ...column,
      cards: newCards
    };
  };

  /**
   * This function adds a card to a column.
   *
   * @param column destination column
   * @param card  card
   * @param index position in the column where the task will be added
   */
  const addCardToColumn = (column: any, card: any, index: number) => {
    // @ts-ignore
    const newCards = Array.from(column.cards);

    newCards.splice(index, 0, card);

    return {
      ...column,
      cards: newCards
    };
  };

  /**
   * This function is called when a card is moved in its own column or to another column.
   * The changed source and destination column will be saved in the columns-State of this component.
   *
   * @param result
   */
  const onCardDragEnd = function (result: any) {
    const { destination, source, draggableId } = result;

    // The source column is the column from which an object is dragged.
    const sourceColumnIndex = columns.findIndex((x: { id: number; }) => 'column-' + x.id === source.droppableId);
    const sourceColumn = columns[sourceColumnIndex];

    // The destination column is the column where an object will be dropped.
    const destinationColumnIndex = columns.findIndex((x: { id: number; }) => 'column-' + x.id === destination.droppableId);
    const destinationColumn = columns[destinationColumnIndex];

    // Copy columns from columns - state
    const newColumns = Array.from(columns);

    // Search the dragging card in the source column.
    // @ts-ignore
    const draggingCard = sourceColumn.cards.find(x => 'card-' + x.id === draggableId);

    // @ts-ignore
    if (sourceColumn.id === destinationColumn.id) {
      let newSourceColumn = removeCardFromColumn(sourceColumn, source.index);
      newSourceColumn = addCardToColumn(newSourceColumn, draggingCard, destination.index);
      // @ts-ignore
      newColumns[sourceColumnIndex] = newSourceColumn;
    } else {
      // Remove Card from source column and add the card to the destination column
      const newSourceColumn = removeCardFromColumn(sourceColumn, source.index);
      const newDestinationColumn = addCardToColumn(destinationColumn, draggingCard, destination.index);
      // @ts-ignore
      newColumns[sourceColumnIndex] = newSourceColumn;
      // @ts-ignore
      newColumns[destinationColumnIndex] = newDestinationColumn;
    }
    setColumns(newColumns);
    return;
  };


  /**
   * This function will be called if any object was dragged.
   *
   * @param result
   */
  const onDragEnd = function (result: any) {

    const { destination, source, type } = result;

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
      onColumnDragEnd(result);
      return;
    }

    if (type === 'card') {
      onCardDragEnd(result);
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            className={snapshot.isDraggingOver ? classes.containerDraggingOver : classes.container}
            ref={provided.innerRef}>
            {columnOrder.map((columnID: number, index: number) => {
              const column = columns.find((x: any) => x.id === columnID);
              return <KanbanColumn key={column.id} column={column} index={index}/>;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default KanbanBoard;

