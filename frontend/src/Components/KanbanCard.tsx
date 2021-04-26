import { Avatar, Card, CardContent, CardHeader, IconButton, makeStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Draggable } from 'react-beautiful-dnd';


const useStyles = makeStyles({
  container: {
    clear: 'left',
    background: 'white',
    marginBottom: '16px',
    maxWidth: '300px',
    '&:hover': {
      cursor: 'pointer',
      border: '2px solid skyblue'
    }
  },
  containerDragging: {
    border: '2px solid skyblue'
  },
  cardFooter: {
    padding: '16px'
  }
});

type TaskPropsTypes = {
  card: {
    id: string,
    title: string,
    description: string
  },
  index: number
}

const KanbanCard = function (props: TaskPropsTypes) {

  const classes = useStyles();

  return (
    <Draggable draggableId={'card-' + props.card.id} index={props.index}>
      {(provided, snapshot) => (
        <Card
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={snapshot.isDragging ? classes.containerDragging : classes.container}
          onClick={() => console.log('clicked!')}
        >
          <CardHeader
            title={props.card.title}
            avatar={
              <Avatar aria-label="recipe">D</Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon/>
              </IconButton>
            }
          />
          <CardContent>
            {props.card.description}
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default KanbanCard;
