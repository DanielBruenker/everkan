package com.example.everkan.project.board;

import com.example.everkan.project.board.column.KanbanColumnRequest;

import java.util.List;


public class KanbanBoardRequest {

    private Long id;
    private List<KanbanColumnRequest> columns;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<KanbanColumnRequest> getColumns() {
        return columns;
    }

    public void setColumns(List<KanbanColumnRequest> columns) {
        this.columns = columns;
    }
}
