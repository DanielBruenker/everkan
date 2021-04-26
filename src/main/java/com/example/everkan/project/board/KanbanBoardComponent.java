package com.example.everkan.project.board;

import com.example.everkan.database.entities.KanbanBoard;
import com.example.everkan.database.entities.KanbanColumn;
import com.example.everkan.project.board.column.KanbanColumnRequest;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/board")
@AllArgsConstructor
public class KanbanBoardComponent {

    private final KanbanBoardService kanbanBoardService;

    @PostMapping(path = "/{boardID}/column")
    public KanbanColumn addColumn(
            @PathVariable("boardID") Long boardID,
            @RequestBody KanbanColumnRequest request) {
        return kanbanBoardService.addColumnToBoard(boardID, request);
    }

    @GetMapping(path = "/{boardID}")
    public KanbanBoard getBoard(
            @PathVariable Long boardID) {
        return kanbanBoardService.findKanbanBoardById(boardID);
    }
}

