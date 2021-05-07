import { KanbanColumn } from './KanbanColumn';

export class KanbanBoard {
  id: number;
  columns: KanbanColumn[];

  constructor(id: number, columns: KanbanColumn[]) {
    this.id = id;
    this.columns = columns;
  }
}