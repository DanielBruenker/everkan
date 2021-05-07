package com.example.everkan.project.board.column;

import com.example.everkan.database.entities.KanbanColumn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KanbanColumnRepository extends JpaRepository<KanbanColumn, Long> {
}
