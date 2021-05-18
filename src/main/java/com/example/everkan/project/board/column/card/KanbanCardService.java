package com.example.everkan.project.board.column.card;

import com.example.everkan.database.entities.KanbanCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class KanbanCardService {

    private final KanbanCardRepository kanbanCardRepository;

    @Autowired
    public KanbanCardService(KanbanCardRepository kanbanCardRepository) {
        this.kanbanCardRepository = kanbanCardRepository;
    }

    public KanbanCard getCardById(Long cardId) {
        return kanbanCardRepository.findById(cardId).orElseThrow(
                () -> new IllegalStateException("Card not found!")
        );
    }

    public KanbanCard update(KanbanCard card) {
        return kanbanCardRepository.save(card);
    }

    public KanbanCard update(KanbanCardRequest request) {
        KanbanCard card = getCardById(request.getId());
        card.setTitle(request.getTitle());
        card.setDescription(request.getDescription());
        return kanbanCardRepository.save(card);
    }
}
