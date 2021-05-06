import { KanbanCard } from './KanbanCard';

export class KanbanColumn {
  id: number;
  title: string;
  index: number;
  cards: KanbanCard[];

  constructor(id: number, title: string, index: number, cards: KanbanCard[]) {
    this.id = id;
    this.title = title;
    this.index = index;
    this.cards = cards;
  }
}