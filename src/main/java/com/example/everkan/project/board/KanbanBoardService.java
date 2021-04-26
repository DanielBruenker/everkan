package com.example.everkan.project.board;

import com.example.everkan.database.entities.KanbanBoard;
import com.example.everkan.database.entities.KanbanColumn;
import com.example.everkan.project.board.column.KanbanColumnRequest;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class KanbanBoardService {

    private final KanbanBoardRepository kanbanBoardRepository;

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
}
