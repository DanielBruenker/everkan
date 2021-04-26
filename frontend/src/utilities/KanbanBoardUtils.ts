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
 * This function is called when a column is moved.
 * The changed column order will be saved in the columnOrder - state of this component.
 *
 * @param columns
 * @param destination
 * @param source
 * @param draggableId
 */
export const moveColumn = (columns: any[], source: any, destination: any, draggableId: any) => {

  // Copy column order from columnOrder - state
  // @ts-ignore
  const newColumnOrder = Array.from(columns);

  // @ts-ignore
  const column = newColumnOrder.find((x: { id: any; }) => x.id === parseInt(draggableId.slice(-1)));

  // move column to new position
  newColumnOrder.splice(source.index, 1);

  // @ts-ignore
  newColumnOrder.splice(destination.index, 0, column);

  // Update the index of each column
  // @ts-ignore
  newColumnOrder.map((_: any, index: number) => newColumnOrder[index].index = index);

  return newColumnOrder;
};


/**
 * This function is called when a card is moved in its own column or to another column.
 * The changed source and destination column will be saved in the columns-State of this component.
 *
 * @param columns
 * @param destination
 * @param source
 * @param draggableId
 */
export const moveCard = (columns: any[], source: any, destination: any, draggableId: any) => {

  // The source column is the column from which an object is dragged.
  const sourceColumnIndex = columns.findIndex((x: { id: number; }) => 'column-' + x.id === source.droppableId);
  const sourceColumn = columns[sourceColumnIndex];

  // The destination column is the column where an object will be dropped.
  const destinationColumnIndex = columns.findIndex((x: { id: number; }) => 'column-' + x.id === destination.droppableId);
  const destinationColumn = columns[destinationColumnIndex];

  // Copy columns from columns - state
  let newColumns = Array.from(columns);

  // Search the dragged card in the source column.
  // @ts-ignore
  const draggedCard = sourceColumn.cards.find(x => 'card-' + x.id === draggableId);

  // @ts-ignore
  if (sourceColumn.id === destinationColumn.id) {
    let newSourceColumn = removeCardFromColumn(sourceColumn, source.index);
    newSourceColumn = addCardToColumn(newSourceColumn, draggedCard, destination.index);

    // Update the index of each card
    newSourceColumn.cards.map((_: any, index: number) => newSourceColumn.cards[index].index = index);

    // @ts-ignore
    newColumns[sourceColumnIndex] = newSourceColumn;


  } else {
    // Remove Card from source column and add the card to the destination column
    const newSourceColumn = removeCardFromColumn(sourceColumn, source.index);
    const newDestinationColumn = addCardToColumn(destinationColumn, draggedCard, destination.index);

    // Update the index of each card
    newSourceColumn.cards.map((_: any, index: number) => newSourceColumn.cards[index].index = index);
    newDestinationColumn.cards.map((_: any, index: number) => newDestinationColumn.cards[index].index = index);

    // @ts-ignore
    newColumns[sourceColumnIndex] = newSourceColumn;

    // @ts-ignore
    newColumns[destinationColumnIndex] = newDestinationColumn;
  }

  return newColumns;
};



