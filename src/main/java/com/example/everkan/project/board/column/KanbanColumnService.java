package com.example.everkan.project.board.column;

import com.example.everkan.database.entities.KanbanCard;
import com.example.everkan.database.entities.KanbanColumn;
import com.example.everkan.project.board.column.card.KanbanCardRequest;
import com.example.everkan.project.board.column.card.KanbanCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class KanbanColumnService {

    private final KanbanColumnRepository kanbanColumnRepository;
    private final KanbanCardService kanbanCardService;

    @Autowired
    public KanbanColumnService(KanbanColumnRepository kanbanColumnRepository, KanbanCardService kanbanCardService) {
        this.kanbanColumnRepository = kanbanColumnRepository;
        this.kanbanCardService = kanbanCardService;
    }

    public KanbanColumn updateColumn(KanbanColumnRequest request) {
        KanbanColumn column = findColumnById(request.getId());
        column.setTitle(request.getTitle());
        column.setIndex(request.getIndex());
        Map<Long, KanbanCard> idToObjectMap = new HashMap<>();
        column.getCards().forEach(card -> idToObjectMap.put(card.getId(), card));
        for (KanbanCardRequest cardRequest : request.getCards()) {
            KanbanCard card = idToObjectMap.get(cardRequest.getId());
            if (card == null) {
                card = kanbanCardService.findCardById(cardRequest.getId());
            }
            card.setIndex(cardRequest.getIndex());
            card.setTitle(cardRequest.getTitle());
            card.setDescription(cardRequest.getDescription());
            card.setColumn(column);
        }
        return kanbanColumnRepository.saveAndFlush(column);
    }

    public List<KanbanColumn> updateColumns(List<KanbanColumnRequest> request) {
        List<KanbanColumn> updatedColumns = new ArrayList<>();
        for (KanbanColumnRequest kanbanColumnRequest : request) {
            KanbanColumn column = updateColumn(kanbanColumnRequest);
            updatedColumns.add(column);
        }
        return updatedColumns;
    }

    private KanbanColumn findColumnById(Long columnId) {
        return kanbanColumnRepository.findById(columnId)
                .orElseThrow(
                        () -> new IllegalStateException("Column not found!")
                );
    }

}
