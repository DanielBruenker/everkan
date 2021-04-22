package com.example.everkan.database.entities;

import lombok.*;

import javax.persistence.*;

@Entity
@Table
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @SequenceGenerator(
            name = "project_sequence",
            sequenceName = "project_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "project_sequence"
    )
    private Long id;
    private String name;

    @OneToOne(
            cascade = CascadeType.ALL
    )
    private KanbanBoard board;

    public Project(String name) {
        this.name = name;
        this.board = KanbanBoard.creatDefaultBoard();
    }

}
