package com.example.everkan.database.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Entity
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

    public KanbanBoard() {
    }

    public KanbanBoard(List<KanbanColumn> columns) {
        this.columns = columns;
    }

    public static KanbanBoard creatDefaultBoard() {
        KanbanCard kanbanCard1 = new KanbanCard("Card 1", "", "");

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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<KanbanColumn> getColumns() {
        return columns;
    }

    public void setColumns(List<KanbanColumn> columns) {
        this.columns = columns;
    }

    public void addColumn(KanbanColumn column) {
        int currentIndex = columns.size();
        column.setIndex(currentIndex);
        column.setBoard(this);
        columns.add(column);
    }

    public Optional<KanbanColumn> getColumnById(Long columnID) {
        return columns.stream()
                .filter(col -> col.getId().equals(columnID))
                .findAny();
    }

    public void removeColumn(KanbanColumn columnToRemove) {
        columnToRemove.setBoard(null);
        columns.remove(columnToRemove);
        for(int i = 0;  i < columns.size(); i++){
            KanbanColumn column = columns.get(i);
            column.setIndex(i);
        }
    }

    public void addColumn(KanbanColumn newColumn, Integer index) {
        newColumn.setBoard(this);
        if(index < columns.size()){
            columns.add(index, newColumn);
            for(int i = 0; i < columns.size(); i++){
                KanbanColumn column = columns.get(i);
                column.setIndex(i);
            }
        } else {
            addColumn(newColumn);
        }
    }
}
