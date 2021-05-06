package com.example.everkan.project.board.column;

import com.example.everkan.project.board.column.card.KanbanCardRequest;

import java.util.List;


public class KanbanColumnRequest {

    private Long id;
    private String title;
    private Integer index;
    private List<KanbanCardRequest> cards;
    private Long boardId;

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

    public List<KanbanCardRequest> getCards() {
        return cards;
    }

    public void setCards(List<KanbanCardRequest> cards) {
        this.cards = cards;
    }

    public Long getBoardId() {
        return boardId;
    }

    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }
}
