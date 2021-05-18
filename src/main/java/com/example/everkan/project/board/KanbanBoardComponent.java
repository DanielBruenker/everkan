package com.example.everkan.project.board;

import com.example.everkan.database.entities.KanbanBoard;
import com.example.everkan.database.entities.KanbanColumn;
import com.example.everkan.project.board.column.KanbanColumnRequest;
import com.example.everkan.project.board.column.card.KanbanCardRequest;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/board")
public class KanbanBoardComponent {

    private final KanbanBoardService kanbanBoardService;

    public KanbanBoardComponent(KanbanBoardService kanbanBoardService) {
        this.kanbanBoardService = kanbanBoardService;
    }

    @PutMapping(path = "/{boardID}")
    public KanbanBoard update(
            @PathVariable("boardID") Long boardID,
            @RequestBody KanbanBoardRequest request) {
        //return kanbanBoardService.update(boardID, request);

        return null;
    }

    @PostMapping(path = "/{boardID}/column")
    public KanbanColumn addColumn(
            @PathVariable("boardID") Long boardID,
            @RequestBody KanbanColumnRequest request) {
        return kanbanBoardService.addColumnToBoard(boardID, request);
    }

    @GetMapping(path = "/{boardID}")
    public KanbanBoard getBoard(
            @PathVariable Long boardID) {
        return kanbanBoardService.getKanbanBoardById(boardID);
    }

    @PutMapping(path = "/{boardId}/moveCard/{cardId}/from/{sourceColumnId}/to/{destinationColumnId}")
    public KanbanBoard moveCard(
            @PathVariable("boardId") Long boardId,
            @PathVariable("cardId") Long cardId,
            @PathVariable("sourceColumnId") Long sourceColumnId,
            @PathVariable("destinationColumnId") Long destinationColumnId,
            @RequestParam("newPosition") Integer newPosition) {

        return kanbanBoardService.moveCard(boardId, cardId, sourceColumnId, destinationColumnId, newPosition);
    }

    @PutMapping(path = "/{boardId}/moveColumn/{columnId}")
    public KanbanBoard moveCard(
            @PathVariable("boardId") Long boardId,
            @PathVariable("columnId") Long columnId,
            @RequestParam("newPosition") Integer newPosition) {

        return kanbanBoardService.moveColumn(boardId, columnId, newPosition);
    }

    @PutMapping(path = "/{boardId}/column/{columnId}/card/{cardId}")
    public KanbanBoard updateCard(
            @PathVariable("boardId") Long boardId,
            @PathVariable("columnId") Long columnId,
            @PathVariable("cardId") Long cardId,
            @RequestBody KanbanCardRequest request) {
        return kanbanBoardService.updateCard(boardId, columnId, cardId, request);
    }
}

