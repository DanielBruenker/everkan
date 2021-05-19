import React from 'react';
import { Draggable } from "react-beautiful-dnd";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";
import { useDispatch } from 'react-redux';
import EvernoteIcon from "../icons/evernoteIcon";
import "./KanbanCard.css";
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
        <Card
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          onClick={handleOnClick}
          className={snapshot.isDragging ? "containerDragging" : "container"}
        >
          <CardHeader title={card.title} />
          <CardContent>{card.description}</CardContent>
          <CardActions disableSpacing>
            {card.noteLink !== "" ? (
              <IconButton
                onClick={() => window.open(card.noteLink, "_blank")}
                aria-label="go to evernote"
              >
                <EvernoteIcon />
              </IconButton>
            ) : null}
          </CardActions>
        </Card>
      )}
    </Draggable>
  );
};

export default KanbanCard;
