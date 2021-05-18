import { KanbanBoard, KanbanCard } from '../types';
import { authHeader } from "./auth-header";
import { api } from "./index";

export async function moveCard(
  boardId: number,
  cardId: number,
  sourceColumnId: number,
  destinationId: number,
  newPosition: number
) {
  const url =
    "/board/" +
    boardId +
    "/moveCard/" +
    cardId +
    "/from/" +
    sourceColumnId +
    "/to/" +
    destinationId +
    "?newPosition=" +
    newPosition;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };
  return await api.put(url, null, config);
}

export async function moveColumn(
  boardId: number,
  columnId: number,
  newPosition: number
) {
  const url =
    "/board/" +
    boardId +
    "/moveColumn/" +
    columnId +
    "?newPosition=" +
    newPosition;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };
  return await api.put(url, null, config);
}

export async function updateBoard(board: KanbanBoard) {
  const url = "/board/" + board.id;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };
  const data = JSON.stringify(board);

  return await api.put(url, data, config);
}

export async function getBoardByID(boardID: number) {
  const url = "/board/" + boardID;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };

  return await api.get(url, config);
}

export async function updateCard(
  kanbanBoard: KanbanBoard,
  card: KanbanCard
) {
  const url = "/board/" + kanbanBoard.id + "/column/" + card.columnId + "/card/" + card.id;
  const data = JSON.stringify(card);
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...authHeader(),
    },
  };
  return await api.put(url, data, config);
}