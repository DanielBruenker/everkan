import { KanbanCard } from '../entities/KanbanCard'
import { KanbanColumn } from '../entities/KanbanColumn';

export const boardUtils = {
  moveCard,
  moveColumn
};


/**
 * This function removes a card from a column.
 *
 * @param column column
 * @param index position of the card which will be removed
 */
const removeCardFromColumn = (column: KanbanColumn, index: number) => {

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
const addCardToColumn = (column: KanbanColumn, card: KanbanCard, index: number) => {

  const newCards = Array.from(column.cards);

  newCards.splice(index, 0, card);

  return {
    ...column,
    cards: newCards
  };
};


/**
 * This factions move a column to an other position.
 *
 * @param columns
 * @param destination
 * @param source
 * @param draggableId
 */
function moveColumn(
  columns: KanbanColumn[],
  source:  {droppableId: string, index: number},
  destination: {droppableId: string, index: number},
  draggableId: string) {

  // Copy column order from columnOrder - state
  const newColumnOrder = Array.from(columns);

  const column = newColumnOrder.find((x: { id: number; }) => x.id === parseInt(draggableId.slice(-1)));

  if (column == undefined) {
    return newColumnOrder;
  }

  newColumnOrder.splice(source.index, 1);

  newColumnOrder.splice(destination.index, 0, column);
  // Update the index of each column

  newColumnOrder.map((_: any, index: number) => newColumnOrder[index].index = index);

  return newColumnOrder;
}


/**
 * This function is moves a card to an other position or to another column.
 *
 * @param columns
 * @param destination
 * @param source
 * @param draggableId
 */
function moveCard(columns: KanbanColumn[],
                  source:  {droppableId: string, index: number},
                  destination:  {droppableId: string, index: number},
                  draggableId: string) {

  // The source column is the column from which an object is dragged.
  const sourceColumnIndex = columns.findIndex((x: { id: number; }) => 'column-' + x.id === source.droppableId);
  const sourceColumn = columns[sourceColumnIndex];

  // The destination column is the column where an object will be dropped.
  const destinationColumnIndex = columns.findIndex((x: { id: number; }) => 'column-' + x.id === destination.droppableId);
  const destinationColumn = columns[destinationColumnIndex];

  // Copy columns from columns
  let newColumns = Array.from(columns);

  // Search the dragged card in the source column.
  const draggedCard = sourceColumn.cards.find(x => 'card-' + x.id === draggableId);

  if(draggedCard == undefined) {
    return newColumns;
  }

  if (sourceColumn.id === destinationColumn.id) {
    let newSourceColumn = removeCardFromColumn(sourceColumn, source.index);
    newSourceColumn = addCardToColumn(newSourceColumn, draggedCard, destination.index);

    // Update the index of each card
    newSourceColumn.cards.map((_: any, index: number) => newSourceColumn.cards[index].index = index);

    newColumns[sourceColumnIndex] = newSourceColumn;

  } else {
    // Remove Card from source column and add the card to the destination column
    const newSourceColumn = removeCardFromColumn(sourceColumn, source.index);
    const newDestinationColumn = addCardToColumn(destinationColumn, draggedCard, destination.index);

    // Update the index of each card
    newSourceColumn.cards.map((_: any, index: number) => newSourceColumn.cards[index].index = index);
    newDestinationColumn.cards.map((_: any, index: number) => newDestinationColumn.cards[index].index = index);

    newColumns[sourceColumnIndex] = newSourceColumn;

    newColumns[destinationColumnIndex] = newDestinationColumn;
  }

  return newColumns;
}



