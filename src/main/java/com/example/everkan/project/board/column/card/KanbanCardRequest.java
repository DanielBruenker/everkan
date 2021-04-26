package com.example.everkan.project.board.column.card;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class KanbanCardRequest {

    private Long id;
    private String title;
    private String description;
    private Integer index;
    private Long columnId;

}
