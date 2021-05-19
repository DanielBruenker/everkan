import { useDispatch } from "react-redux";
import { Draggable } from "react-beautiful-dnd";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";

import EvernoteIcon from "../icons/evernoteIcon";
import "./KanbanCard.css";
import { kanbanBoardUIActions } from "../index";
import { KanbanCard as KanbanCardType } from "../../types";

interface KanbanCardProps {
  card: KanbanCardType;
  index: number;
}

const KanbanCard = function (props: KanbanCardProps) {
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(kanbanBoardUIActions.showKanbanCardDialog({ card: props.card }));
  };

  return (
    <Draggable draggableId={"card-" + props.card.id} index={props.index}>
      {(provided, snapshot) => (
        <Card
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          onClick={handleOnClick}
          className={snapshot.isDragging ? "containerDragging" : "container"}
        >
          <CardHeader title={props.card.title} />
          <CardContent>{props.card.description}</CardContent>
          <CardActions disableSpacing>
            {props.card.noteLink !== "" ? (
              <IconButton
                onClick={() => window.open(props.card.noteLink, "_blank")}
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
