package com.example.everkan.project.board;

import com.example.everkan.database.entities.KanbanBoard;
import com.example.everkan.database.entities.KanbanColumn;
import com.example.everkan.project.board.column.KanbanColumnRequest;
import com.example.everkan.project.board.column.KanbanColumnService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@AllArgsConstructor
public class KanbanBoardService {

    private final KanbanBoardRepository kanbanBoardRepository;
    private final KanbanColumnService kanbanColumnService;

    public KanbanBoard findKanbanBoardById(Long boardId) {
        return kanbanBoardRepository
                .findKanbanBoardById(boardId)
                .orElseThrow(() -> new IllegalStateException("Board not found!"));
    }

    public KanbanColumn addColumnToBoard(Long boardId, KanbanColumnRequest request) {
        KanbanBoard board = findKanbanBoardById(boardId);
        KanbanColumn kanbanColumn = new KanbanColumn(request.getTitle());
        board.addColumn(kanbanColumn);
        kanbanBoardRepository.save(board);
        return kanbanColumn;
    }

    public KanbanBoard update(Long boardId, KanbanBoardRequest request) {
        KanbanBoard board = findKanbanBoardById(boardId);
        List<KanbanColumn> columns = kanbanColumnService.updateColumns(request.getColumns());
        board.setColumns(columns);
        return kanbanBoardRepository.saveAndFlush(board);
    }
}
