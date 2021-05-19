package com.example.everkan.database.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table
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
    private String noteLink;
    private Integer index;


    @Column(name = "column_id", insertable = false, updatable = false)
    private Long columnId;

    @ManyToOne
    @JoinColumn(name = "column_id", nullable = true)
    @JsonIgnore
    private KanbanColumn column;

    public KanbanCard() {
    }

    public KanbanCard(String title, String description, String noteLink) {
        this.title = title;
        this.description = description;
        this.noteLink = noteLink;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public KanbanColumn getColumn() {
        return column;
    }

    public void setColumn(KanbanColumn column) {
        this.column = column;
    }

    public Long getColumnId() {
        return columnId;
    }

    public void setColumnId(Long columnId) {
        this.columnId = columnId;
    }

    public String getNoteLink() {
        return noteLink;
    }

    public void setNoteLink(String noteLink) {
        this.noteLink = noteLink;
    }
}
