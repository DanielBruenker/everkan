package com.example.everkan.project.board.column;

import com.example.everkan.project.board.column.card.KanbanCardRequest;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class KanbanColumnRequest {

    private Long id;
    private String title;
    private Integer index;
    private List<KanbanCardRequest> cards;
    private Long boardId;
}
