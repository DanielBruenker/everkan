package com.example.everkan.project.board.column.card;

import com.example.everkan.database.entities.KanbanCard;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class KanbanCardService {

    private final KanbanCardRepository kanbanCardRepository;

    public KanbanCard findCardById(Long cardId) {
        return kanbanCardRepository.findCardById(cardId)
                .orElseThrow(() -> new IllegalStateException("Card not found!"));
    }
}
