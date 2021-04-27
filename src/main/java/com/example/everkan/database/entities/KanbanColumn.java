package com.example.everkan.database.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private Integer index;

    @OneToMany(
            mappedBy = "column",
            cascade = CascadeType.ALL
    )
    @OrderBy(value = "index")
    private List<KanbanCard> cards = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "board_id", nullable = false)
    @JsonIgnore
    private KanbanBoard board;

    public KanbanColumn(String title) {
        this.title = title;
    }

    public void addCard(KanbanCard card) {
        int index = cards.size();
        card.setIndex(index);
        card.setColumn(this);
        cards.add(card);
    }

}
