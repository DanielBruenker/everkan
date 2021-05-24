package com.example.everkan.project.board.column;

import com.example.everkan.database.entities.KanbanColumn;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KanbanColumnRepository extends CrudRepository<KanbanColumn, Long> {
}
