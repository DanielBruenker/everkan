package com.example.everkan.project.board;

import com.example.everkan.database.entities.KanbanBoard;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KanbanBoardRepository
        extends CrudRepository<KanbanBoard, Long> {
    Optional<KanbanBoard> findKanbanBoardById(Long id);
}
