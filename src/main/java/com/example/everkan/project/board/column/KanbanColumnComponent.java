package com.example.everkan.project.board.column;

import com.example.everkan.database.entities.KanbanColumn;
import com.example.everkan.project.board.KanbanBoardService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/board/{boardID}")
public class KanbanColumnComponent {}
