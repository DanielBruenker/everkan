export class KanbanCard {
  id: number;
  title: string;
  description: string;
  index: number;

  constructor(id: number, title: string, description: string, index: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.index = index;
  }
}