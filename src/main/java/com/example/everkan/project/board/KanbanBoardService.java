package com.example.everkan.project.board;

import com.example.everkan.database.entities.KanbanBoard;
import com.example.everkan.database.entities.KanbanCard;
import com.example.everkan.database.entities.KanbanColumn;
import com.example.everkan.project.board.column.KanbanColumnRequest;
import com.example.everkan.project.board.column.KanbanColumnService;
import com.example.everkan.project.board.column.card.KanbanCardRequest;
import com.example.everkan.project.board.column.card.KanbanCardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;


@Service
public class KanbanBoardService {

    private final KanbanBoardRepository kanbanBoardRepository;
    private final KanbanColumnService kanbanColumnService;
    private final KanbanCardService kanbanCardService;

    @Autowired
    public KanbanBoardService(
            KanbanBoardRepository kanbanBoardRepository,
            KanbanColumnService kanbanColumnService,
            KanbanCardService kanbanCardService) {
        this.kanbanBoardRepository = kanbanBoardRepository;
        this.kanbanColumnService = kanbanColumnService;
        this.kanbanCardService = kanbanCardService;
    }

    public KanbanBoard getKanbanBoardById(Long boardId) {
        return kanbanBoardRepository
                .findKanbanBoardById(boardId)
                .orElseThrow(() -> new IllegalStateException("Board not found!"));
    }

    public KanbanColumn addColumnToBoard(Long boardId, KanbanColumnRequest request) {
        KanbanBoard board = getKanbanBoardById(boardId);
        KanbanColumn kanbanColumn = new KanbanColumn(request.getTitle());
        board.addColumn(kanbanColumn);
        kanbanBoardRepository.save(board);
        return kanbanColumn;
    }

    public KanbanBoard update(KanbanBoard board){
        return kanbanBoardRepository.save(board);
    }

    @Transactional
    public KanbanBoard moveCard(
            Long boardId,
            Long cardId,
            Long sourceColumnId,
            Long destinationColumnId,
            Integer newPosition) {

        KanbanBoard board = getKanbanBoardById(boardId);
        KanbanCard card = kanbanCardService.getCardById(cardId);
        KanbanColumn sourceColumn = kanbanColumnService.getColumnById(sourceColumnId);
        KanbanColumn destinationColumn = kanbanColumnService.getColumnById(destinationColumnId);

        sourceColumn.removeCard(card);
        kanbanColumnService.update(sourceColumn);

        destinationColumn.addCard(card, newPosition);
        kanbanColumnService.update(destinationColumn);

        kanbanCardService.update(card);
        return board;
    }

    @Transactional
    public KanbanBoard moveColumn(
            Long boardId,
            Long columnId,
            Integer newPosition) {
        KanbanBoard board = getKanbanBoardById(boardId);
        KanbanColumn column = kanbanColumnService.getColumnById(columnId);
        board.removeColumn(column);
        board.addColumn(column, newPosition);
        return update(board);
    }

    @Transactional
    public KanbanBoard updateCard(Long boardId, Long columnId, Long cardId, KanbanCardRequest request) {
        KanbanBoard board = getKanbanBoardById(boardId);
        kanbanCardService.update(request);
        return board;
    }

    @Transactional
    public KanbanBoard addCard(Long boardId, Long columnId, KanbanCardRequest request) {
        KanbanBoard board = getKanbanBoardById(boardId);
        KanbanColumn column = kanbanColumnService.getColumnById(columnId);
        KanbanCard card = new KanbanCard(
                request.getTitle(),
                request.getDescription(),
                request.getNoteLink()
        );
        column.addCard(card);
        kanbanColumnService.update(column);
        return board;
    }
}
