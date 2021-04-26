package com.example.everkan.project.board.column.card;

import com.example.everkan.database.entities.KanbanCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KanbanCardRepository extends JpaRepository<KanbanCard, Long> {
    Optional<KanbanCard> findCardById(Long id);
}
