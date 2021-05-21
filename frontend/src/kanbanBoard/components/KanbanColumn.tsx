import { Button } from 'primereact/button';
import React from 'react';
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { kanbanBoardUIActions } from "../index";
import KanbanCard from "./KanbanCard";

import "./KanbanColumn.css";

import { KanbanColumn as KanbanColumnType } from "../../types";

interface KanbanColumnProps {
  column: KanbanColumnType;
  index: number;
  onColumnTitleChange: any;
}

interface KanbanColumnHeaderProps {
  columnTitle: string;
}

const KanbanColumnHeader: React.FC<KanbanColumnHeaderProps> = ({
  columnTitle,
  children,
}) => {
  return (
    <div className="columnHeader">
      {children}
      <h4 className="title">{columnTitle}</h4>
    </div>
  );
};

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, index }) => {
  const dispatch = useDispatch();

  const handleOnClickOnAddNewKanbanCard = () => {
    dispatch(
      kanbanBoardUIActions.showAddNewKanbanCardDialog({ column: column })
    );
  };

  const renderCards = () => {
    return column.cards.map((card: any, index: number) => (
      <KanbanCard key={card.id} card={card} index={index} />
    ));
  };

  return (
    <Draggable draggableId={"column-" + column.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={snapshot.isDragging ? "columnDragging" : "column"}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <KanbanColumnHeader columnTitle={column.title} />
          <Droppable droppableId={"column-" + column.id} type="card">
            {(provided, snapshot) => (
              <div
                className={
                  snapshot.isDraggingOver
                    ? "taskListOnDraggingOver"
                    : "taskList"
                }
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {renderCards()}
                {provided.placeholder}
               <div className="p-grid p-justify-center p-mt-5">
                 <Button icon="pi pi-plus"
                         style={{'fontSize': '2em'}}
                         className="p-button-rounded p-button-text"
                         onClick={handleOnClickOnAddNewKanbanCard}/>
               </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanColumn;
