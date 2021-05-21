import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../store";
import EvernoteIcon from "../icons/evernoteIcon";
import { kanbanBoardActions, kanbanBoardUIActions } from "../index";

const AddNewKanbanCardDialogHeader: React.FC = () => {
  return <div>Neue Aufgabe</div>;
};

interface AddNewKanbanCardDialogFooterProps {
  onClickCancel: (event) => void;
  onClickCreate: (event) => void;
}

const AddNewKanbanCardDialogFooter: React.FC<AddNewKanbanCardDialogFooterProps> =
  ({ onClickCancel, onClickCreate }) => {
    return (
      <div>
        <Button label="Abbrechen" icon="pi pi-times" onClick={onClickCancel} />
        <Button label="Anlegen" icon="pi pi-check" onClick={onClickCreate} />
      </div>
    );
  };

const AddNewKanbanCardDialog: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [noteLink, setNoteLink] = useState<string>("");

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

  return (
    <Dialog
      header={<AddNewKanbanCardDialogHeader />}
      footer={
        <AddNewKanbanCardDialogFooter
          onClickCancel={handleOnClose}
          onClickCreate={handelOnSave}
        />
      }
      visible={showAddNewKanbanCardDialog}
      onHide={handleOnClose}
      className="layout-add-new-kanban-card-dialog"
    >
      <div className="p-grid p-mt-2">
        <div className="p-col-12 p-justify-center">
          <InputText
            className="title-input"
            placeholder="Aufgabe"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="p-col-12">
          <InputTextarea
            autoResize={false}
            placeholder="Beschreibung"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="p-col-12">
          <div className="p-inputgroup" style={{ width: "400px" }}>
            <span className="p-inputgroup-addon">
              <EvernoteIcon />
            </span>
            <InputText
              placeholder="Link zu Evernote Notiz"
              value={noteLink}
              onChange={(e) => setNoteLink(e.target.value)}
            />
            <Button
              label="Öffnen"
              disabled={noteLink.length === 0}
              onClick={() => window.open(noteLink, "_blank")}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AddNewKanbanCardDialog;
