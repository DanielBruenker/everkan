export type KanbanCard = {
  id: number,
  title: string,
  description: string,
  noteLink: string,
  index: number,
  columnId: number
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
