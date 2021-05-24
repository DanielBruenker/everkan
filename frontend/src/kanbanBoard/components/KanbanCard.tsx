import { Card } from 'primereact/card';
import React from 'react';
import { Draggable } from "react-beautiful-dnd";
import { useDispatch } from 'react-redux';
import { kanbanBoardUIActions } from "../index";
import { KanbanCard as KanbanCardType } from "../../types";

interface KanbanCardProps {
  card: KanbanCardType;
  index: number;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ card, index }) =>  {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(kanbanBoardUIActions.showKanbanCardDialog({ card: card }));
  };

  return (
    <Draggable draggableId={"card-" + card.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          onClick={handleOnClick}
          className={snapshot.isDragging ? "kanban-card-dragging" : "kanban-card"}>
          <Card title={card.title} className="card">
            <div>
              <p className="p-m-0" style={{lineHeight: '1.5'}}>{card.description}</p>
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
