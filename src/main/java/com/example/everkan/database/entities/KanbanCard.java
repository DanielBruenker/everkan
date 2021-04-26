package com.example.everkan.database.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class KanbanCard {

    @SequenceGenerator(
            name = "kanban_card_sequence",
            sequenceName = "kanban_card_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "kanban_card_sequence"
    )
    private Long id;
    private String title;
    private String description;
    private Integer index;
    private Long columnId;

    public KanbanCard(String title, String description) {
        this.title = title;
        this.description = description;
    }
}
