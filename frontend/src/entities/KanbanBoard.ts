import { KanbanColumn } from './KanbanColumn';
import {immerable} from 'immer';

export class KanbanBoard {
  [immerable] = true
  id: number;
  columns: KanbanColumn[];
  changed = false;

  constructor(id: number, columns: KanbanColumn[]) {
    this.id = id;
    this.columns = columns;
  }
}
