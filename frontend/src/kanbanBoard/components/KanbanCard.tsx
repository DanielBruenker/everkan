import { Card, CardContent, CardHeader } from "@material-ui/core";
import { useEffect } from 'react';
import { Draggable } from "react-beautiful-dnd";

import "./KanbanCard.css";
import { useDispatch } from 'react-redux';
import { KanbanCard } from '../../types';
import { kanbanCardUIActions } from '../index';

type TaskPropsTypes = {
  card: KanbanCard,
  index: number;
};

const KanbanCard = function (props: TaskPropsTypes) {

  const dispatch = useDispatch();

  const handleOnClick = event => {
    dispatch(kanbanCardUIActions.showKanbanCardDialog({card: props.card}))
  };

  return (
    <Draggable draggableId={"card-" + props.card.id} index={props.index}>
      {(provided, snapshot) => (
        <Card
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          onClick={handleOnClick}
          ref={provided.innerRef}
          className={snapshot.isDragging ? "containerDragging" : "container"}
        >
          <CardHeader title={props.card.title} />
          <CardContent>{props.card.description}</CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default KanbanCard;
