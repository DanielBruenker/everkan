package com.example.everkan.project.board.column;

import com.example.everkan.database.entities.KanbanColumn;
import com.example.everkan.project.board.KanbanBoardService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/board/{boardID}")
public class KanbanColumnComponent {

    private final KanbanColumnService kanbanColumnService;
    private final KanbanBoardService kanbanBoardService;


    @PutMapping("column")
    public KanbanColumn updateColumn(
            @RequestBody KanbanColumnRequest request,
            @PathVariable Long boardID) {
        kanbanBoardService.findKanbanBoardById(boardID);
        return kanbanColumnService.updateColumn(request);
    }

    @PutMapping(path = "columns")
    public List<KanbanColumn> updateColumns(
            @RequestBody List<KanbanColumnRequest> request) {
        return kanbanColumnService.updateColumns(request);
    }


}
