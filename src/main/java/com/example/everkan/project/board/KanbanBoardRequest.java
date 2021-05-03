package com.example.everkan.project.board;

import com.example.everkan.project.board.column.KanbanColumnRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class KanbanBoardRequest {

    private Long id;
    private List<KanbanColumnRequest> columns;


}
