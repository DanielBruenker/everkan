import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../store";
import EvernoteIcon from "../icons/evernoteIcon";
import { kanbanBoardActions, kanbanBoardUIActions } from "../index";

interface KanbanCardDialogFooterProps {
  onClickOnSave: (event) => void;
  onClickOnCancel: (event) => void;
}

const KanbanCardDialogFooter: React.FC<KanbanCardDialogFooterProps> = ({
  onClickOnCancel,
  onClickOnSave,
}) => {
  return (
    <div>
      <Button label="Abbrechen" icon="pi pi-times" onClick={onClickOnCancel} />
      <Button label="Übernehmen" icon="pi pi-check" onClick={onClickOnSave} />
    </div>
  );
};

interface KanbanCardDialogHeaderProps {
  title: string;
}

const KanbanCardDialogHeader: React.FC<KanbanCardDialogHeaderProps> = ({
  title,
}) => {
  return <div>{title}</div>;
};

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
    <Dialog
      header={<KanbanCardDialogHeader title={title} />}
      footer={
        <KanbanCardDialogFooter
          onClickOnCancel={handleOnClose}
          onClickOnSave={handelOnSave}
        />
      }
      visible={showKanbanCardDialog}
      className="layout-kanban-card-dialog"
      modal
      onHide={handleOnClose}
    >
      <div className="p-grid p-mt-2">
        <div className="p-col-12">
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
            placeholder="Keine Beschreibung zu dieser Karte"
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

export default KanbanCardDialog;
