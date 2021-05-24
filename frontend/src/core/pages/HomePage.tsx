import React from "react";
import AddNewKanbanCardDialog from "../../kanbanBoard/components/AddNewKanbanCardDialog";
import KanbanBoard from "../../kanbanBoard/components/KanbanBoard";
import KanbanCardDialog from "../../kanbanBoard/components/KanbanCardDialog";

const HomePage: React.FC = () => {
  return (
    <React.Fragment>
      <KanbanBoard />
      <KanbanCardDialog />
      <AddNewKanbanCardDialog />
    </React.Fragment>
  );
};

export default HomePage;
