package com.example.everkan.database.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KanbanBoard {

    @SequenceGenerator(
            name = "kanban_board_sequence",
            sequenceName = "kanban_board_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "kanban_board_sequence"
    )
    private Long id;

    @OneToMany(
            mappedBy = "board",
            cascade = CascadeType.ALL
    )
    @OrderBy(value = "index")
    private List<KanbanColumn> columns = new ArrayList<>();

    public KanbanBoard(List<KanbanColumn> columns) {
        this.columns = columns;
    }

    public static KanbanBoard creatDefaultBoard() {
        KanbanCard kanbanCard1 = new KanbanCard("Card 1", "");
        KanbanColumn column1 = new KanbanColumn("To Do");
        KanbanColumn column2 = new KanbanColumn("In Progress");
        KanbanColumn column3 = new KanbanColumn("Done");
        column1.addCard(kanbanCard1);

        KanbanBoard board = new KanbanBoard();
        board.addColumn(column1);
        board.addColumn(column2);
        board.addColumn(column3);

        return board;
    }

    public void addColumn(KanbanColumn column) {
        int currentIndex = columns.size();
        column.setIndex(currentIndex);
        column.setBoard(this);
        columns.add(column);
    }

    public KanbanColumn getColumnById(Long columnID) {
        return columns.stream()
                .filter(col -> col.getId().equals(columnID))
                .findAny()
                .orElse(null);
    }

}
