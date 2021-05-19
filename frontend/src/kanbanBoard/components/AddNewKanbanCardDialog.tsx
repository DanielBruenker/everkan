import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../store';
import { kanbanBoardActions, kanbanBoardUIActions } from "../index";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

const AddNewKanbanCardDialog: React.FC = () => {
  const kanbanBoard = useTypedSelector((state) => state.kanbanBoard);
  const { selectedColumn, showAddNewKanbanCardDialog } = useTypedSelector(
    (state) => state.kanbanBoardUI
  );
  const dispatch = useDispatch();

  const handleOnClose = (): void => {
    dispatch(kanbanBoardUIActions.hideAddNewKanbanCardDialog());
    setDescription("");
    setTitle("");
    setNoteLink("");
  };

  const handelOnSave = (): void => {
    dispatch(kanbanBoardUIActions.hideAddNewKanbanCardDialog());
    dispatch(
      kanbanBoardActions.addCard({
        board: kanbanBoard,
        column: selectedColumn,
        card: {
          id: 0,
          title: title,
          description: description,
          noteLink: noteLink,
          index: selectedColumn.cards.length,
          columnId: selectedColumn.id,
        },
      })
    );
    setTitle("");
    setDescription("");
  };

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [noteLink, setNoteLink] = useState<string>("");

  return (
    <div>
      <Dialog
        open={showAddNewKanbanCardDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Neue Aufgabe</DialogTitle>
        <DialogContent>
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
            Anlegen
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNewKanbanCardDialog;
