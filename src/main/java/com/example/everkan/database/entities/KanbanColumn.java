package com.example.everkan.database.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KanbanColumn {

    @SequenceGenerator(
            name = "kanban_column_sequence",
            sequenceName = "kanban_column_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "kanban_column_sequence"
    )
    private Long id;
    private String title;

    @OneToMany(
            cascade = CascadeType.ALL
    )
    private List<KanbanCard> cards = new ArrayList<>();

    public KanbanColumn(String title) {
        this.title = title;
    }

    public void addTask(KanbanCard kanbanCard) {
        cards.add(kanbanCard);
    }

}
