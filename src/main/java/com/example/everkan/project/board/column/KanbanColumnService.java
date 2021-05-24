package com.example.everkan.project.board.column;

import com.example.everkan.database.entities.KanbanCard;
import com.example.everkan.database.entities.KanbanColumn;
import com.example.everkan.project.board.column.card.KanbanCardRequest;
import com.example.everkan.project.board.column.card.KanbanCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class KanbanColumnService {

    private final KanbanColumnRepository kanbanColumnRepository;
    private final KanbanCardService kanbanCardService;

    @Autowired
    public KanbanColumnService(KanbanColumnRepository kanbanColumnRepository, KanbanCardService kanbanCardService) {
        this.kanbanColumnRepository = kanbanColumnRepository;
        this.kanbanCardService = kanbanCardService;
    }

    public KanbanColumn getColumnById(Long columnId) {
        return kanbanColumnRepository.findById(columnId).orElseThrow(
                () -> new IllegalStateException("Column not found!")
        );
    }

    public KanbanColumn update(KanbanColumn column) {
        return kanbanColumnRepository.save(column);
    }
}
