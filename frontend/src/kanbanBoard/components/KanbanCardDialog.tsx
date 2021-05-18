import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { kanbanBoardActions, kanbanCardUIActions } from '../index';


const KanbanCardDialog = () => {
  const kanbanCardUI = useSelector((state: RootState) => state.kanbanCardUI);
  const kanbanBoard = useSelector((state: RootState) => state.kanbanBoard);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(kanbanCardUI.selectedCard.title);
    setDescription(kanbanCardUI.selectedCard.description);
  }, [kanbanCardUI]);

  const handleOnClose = event => {
    dispatch(kanbanCardUIActions.hideKanbanCardDialog())
  };

  const handelOnSave = event => {
    dispatch(kanbanCardUIActions.hideKanbanCardDialog());
    const updatedCard = {
      ...kanbanCardUI.selectedCard,
      title: title,
      description: description
    }
    dispatch(kanbanBoardActions.updateCard({board: kanbanBoard, card: updatedCard}));
  };

  const [title, setTitle] = useState(kanbanCardUI.selectedCard.title);
  const [description, setDescription] = useState(kanbanCardUI.selectedCard.title);

  return (
    <div>
      <Button variant="outlined" color="primary">
        Open form dialog
      </Button>
      <Dialog open={kanbanCardUI.showKanbanCardDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" />
        <DialogContent>
          <TextField
            autoFocus
            value={title}
            onChange={event => setTitle(event.target.value)}
            margin="dense"
            id="title"
            label="Bezeichnung"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            value={description}
            onChange={event => setDescription(event.target.value)}
            margin="dense"
            id="title"
            label="Beschreibung"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleOnClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handelOnSave}>
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default KanbanCardDialog;