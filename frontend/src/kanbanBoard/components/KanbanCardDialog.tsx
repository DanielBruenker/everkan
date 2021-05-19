import React, { useEffect, useState } from "react";

import {
  createStyles,
  IconButton,
  Theme,
  Typography,
  withStyles,
  WithStyles,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from "@material-ui/core";

import MuiDialogTitle from "@material-ui/core/DialogTitle";

import CloseIcon from "@material-ui/icons/Close";
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../store';
import { kanbanBoardActions, kanbanBoardUIActions } from "../index";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const KanbanCardDialog: React.FC = () => {
  const { showKanbanCardDialog, selectedCard } = useTypedSelector(
    (state) => state.kanbanBoardUI
  );
  const kanbanBoard = useTypedSelector((state) => state.kanbanBoard);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(selectedCard.title);
    setDescription(selectedCard.description);
    setNoteLink(selectedCard.noteLink);
  }, [selectedCard]);

  const handleOnClose = (): void => {
    dispatch(kanbanBoardUIActions.hideKanbanCardDialog());
  };

  const handelOnSave = (): void => {
    dispatch(kanbanBoardUIActions.hideKanbanCardDialog());
    const updatedCard = {
      ...selectedCard,
      title: title,
      description: description,
      noteLink: noteLink,
    };
    dispatch(
      kanbanBoardActions.updateCard({ board: kanbanBoard, card: updatedCard })
    );
  };

  const [title, setTitle] = useState<string>(selectedCard.title);
  const [description, setDescription] = useState<string>(
    selectedCard.description
  );
  const [noteLink, setNoteLink] = useState<string>("");

  return (
    <div>
      <Dialog open={showKanbanCardDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="kanban-card-dialog-title" onClose={handleOnClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers={true}>
          <TextField
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            margin="dense"
            id="title"
            label="Bezeichnung"
            type="text"
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            margin="dense"
            id="title"
            label="Beschreibung"
            type="text"
            multiline={true}
            rows={5}
            variant="outlined"
            fullWidth
          />
          <TextField
            autoFocus
            value={noteLink}
            onChange={(event) => setNoteLink(event.target.value)}
            margin="dense"
            id="title"
            label="Link zur Evernote Notiz"
            type="text"
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleOnClose}>
            Abbrechen
          </Button>
          <Button color="primary" onClick={handelOnSave}>
            Übernehmen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default KanbanCardDialog;
