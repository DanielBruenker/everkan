import { Avatar, CardContent, CardHeader, IconButton, makeStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Draggable } from 'react-beautiful-dnd';
import { Card } from 'primereact/card';

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
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          onClick={() => console.log('clicked!')}
          ref={provided.innerRef}
        >
          <Card
            title={props.card.title}
            className={snapshot.isDragging ? classes.containerDragging : classes.container}
          >
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default KanbanCard;
