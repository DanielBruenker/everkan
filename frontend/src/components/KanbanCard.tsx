import { Card, CardContent, CardHeader } from '@material-ui/core';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import './KanbanCard.css';


type TaskPropsTypes = {
  card: {
    id: string,
    title: string,
    description: string
  },
  index: number
}

const KanbanCard = function (props: TaskPropsTypes) {

  return (
    <Draggable draggableId={'card-' + props.card.id} index={props.index}>
      {(provided, snapshot) => (
        <Card
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          onClick={() => console.log('clicked!')}
          ref={provided.innerRef}
          className={snapshot.isDragging ? "containerDragging" : "container"}
        >
          <CardHeader title={props.card.title} />
          <CardContent>
            {props.card.description}
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default KanbanCard;
