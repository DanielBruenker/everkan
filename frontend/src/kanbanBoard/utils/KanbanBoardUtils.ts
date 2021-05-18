import { KanbanBoard, KanbanCard, KanbanColumn } from "../../types";

export const kanbanBoardUtils = {
  moveCard,
  moveColumn,
  findColumn,
  findCard,
  updateCard
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
    cards: newCards,
  };
};

/**
 * This function adds a card to a column.
 *
 * @param column destination column
 * @param card  card
 * @param index position in the column where the task will be added
 */
const addCardToColumn = (
  column: KanbanColumn,
  card: KanbanCard,
  index: number
) => {
  const newCards = Array.from(column.cards);

  newCards.splice(index, 0, card);

  return {
    ...column,
    cards: newCards,
  };
};

/**
 * This factions move a column to an other position.
 *
 * @param board
 * @param column
 * @param newPosition
 */
function moveColumn(
  board: KanbanBoard,
  column: KanbanColumn,
  newPosition: number,
) {
  // Copy column order from columnOrder - state
  const newColumnOrder = Array.from(board.columns);

  newColumnOrder.splice(column.index, 1);

  newColumnOrder.splice(newPosition, 0, column);

  // Update the index of each column
  newColumnOrder.map(
    (_: any, index: number) =>
      (newColumnOrder[index] = { ...newColumnOrder[index], index: index })
  );

  return {
    ...board,
    columns: newColumnOrder,
  };
}

/**
 * This function is moves a card to an other position or to another column.
 *
 * @param board
 * @param card
 * @param sourceColumn
 * @param destinationColumn
 * @param newPosition
 */
function moveCard(
  board: KanbanBoard,
  card: KanbanCard,
  sourceColumn: KanbanColumn,
  destinationColumn: KanbanColumn,
  newPosition: number
): KanbanBoard {

  const columns = Array.from(board.columns);

  // Copy columns from columns
  let newColumns = Array.from(columns);

  if (sourceColumn.id === destinationColumn.id) {
    let newSourceColumn = removeCardFromColumn(sourceColumn, card.index);
    newSourceColumn = addCardToColumn(
      newSourceColumn,
      card,
      newPosition
    );

    // Update the index of each card
    newSourceColumn = reindexCards(newSourceColumn);

    newColumns[sourceColumn.index] = newSourceColumn;
  } else {
    // Remove Card from source column and add the card to the destination column
    let newSourceColumn = removeCardFromColumn(sourceColumn, card.index);
    let newDestinationColumn = addCardToColumn(
      destinationColumn,
      card,
      newPosition
    );

    // Update the index of each card
    newSourceColumn = reindexCards(newSourceColumn);
    newDestinationColumn = reindexCards(newDestinationColumn);

    // Replace columns with updated columns
    newColumns[sourceColumn.index] = newSourceColumn;
    newColumns[destinationColumn.index] = newDestinationColumn;
  }

  return {
    ...board,
    columns: newColumns,
  };
}


function updateCard(board: KanbanBoard, newCard: KanbanCard)  {

  // Find column with to card
  const column = board.columns.find((x: { id: number }) => x.id === newCard.columnId);

  if(column == undefined){
    return board;
  }

  const card = column.cards.find((x: { id: number }) => x.id === newCard.id);
  if(card == undefined){
    return board;
  }

  let newColumn = removeCardFromColumn(column, card.index);
  newColumn = addCardToColumn(newColumn, card, card.index);

  let newColumns = Array.from(board.columns);
  newColumns[newColumn.index] = newColumn;

  return {
    ...board,
    columns: newColumns
  };
}


function reindexCards(column: KanbanColumn) {
  column.cards.map(
    (_: KanbanCard, index: number) =>
      (column.cards[index] = { ...column.cards[index], index: index })
  );
  return column;
}

function findColumn(columns: KanbanColumn[], id: string) {
  const index = columns.findIndex(
    (x: { id: number }) => "column-" + x.id === id
  );
  return columns[index];
}

function findCard(sourceColumn: KanbanColumn, draggableId: string) {
  return sourceColumn.cards.find((x) => "card-" + x.id === draggableId);
}
