package com.example.everkan.database.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
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
    @JoinColumn(name = "board_id", nullable = true)
    @JsonIgnore
    private KanbanBoard board;

    public KanbanColumn() {
    }

    public KanbanColumn(String title) {
        this.title = title;
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

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

    public List<KanbanCard> getCards() {
        return cards;
    }

    public void setCards(List<KanbanCard> cards) {
        this.cards = cards;
    }

    public KanbanBoard getBoard() {
        return board;
    }

    public void setBoard(KanbanBoard board) {
        this.board = board;
    }

    public void addCard(KanbanCard card) {
        int index = cards.size();
        card.setIndex(index);
        card.setColumn(this);
        cards.add(card);
    }

    public void addCard(KanbanCard newCard, Integer index) {
        newCard.setColumn(this);
        if(index < cards.size()){
            cards.add(index, newCard);
        } else {
            cards.add(newCard);
        }
        for(int i = 0; i < cards.size(); i++){
            KanbanCard card = cards.get(i);
            card.setIndex(i);
        }
    }

    public void removeCard(KanbanCard cardToRemove) {
        cards.remove(cardToRemove);
        cardToRemove.setColumn(null);
        for(int i = 0; i < cards.size(); i++){
            KanbanCard card = cards.get(i);
            card.setIndex(i);
        }
    }
}
