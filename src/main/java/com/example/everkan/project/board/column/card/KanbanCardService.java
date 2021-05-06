package com.example.everkan.project.board.column.card;

import com.example.everkan.database.entities.KanbanCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KanbanCardService {

    private final KanbanCardRepository kanbanCardRepository;

    @Autowired
    public KanbanCardService(KanbanCardRepository kanbanCardRepository) {
        this.kanbanCardRepository = kanbanCardRepository;
    }

    public KanbanCard findCardById(Long cardId) {
        return kanbanCardRepository.findCardById(cardId)
                .orElseThrow(() -> new IllegalStateException("Card not found!"));
    }
}
