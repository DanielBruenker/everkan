export type KanbanCard = {
  id: number,
  title: string,
  description: string,
  index: number
  columnId
};

export type KanbanColumn = {
  id: number,
  title: string,
  cards: KanbanCard[],
  index: number
}

export type KanbanBoard = {
  id: number,
  columns: KanbanColumn[]
}
