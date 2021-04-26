package com.example.everkan.project;

import com.example.everkan.database.entities.KanbanBoard;
import com.example.everkan.database.entities.KanbanCard;
import com.example.everkan.database.entities.KanbanColumn;
import com.example.everkan.database.entities.Project;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ProjectService service;

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    void testGetAllProjectsReturnsExpectedResult() throws Exception {
        // GIVEN
        String uri = "/api/v1/projects";
        List<Project> projects = Arrays.asList(
                new Project("Project 1"),
                new Project("Project 2"),
                new Project("Project 3")
        );
        projectRepository.saveAll(projects);
        String expectedResult = new ObjectMapper().writeValueAsString(projects);

        // WHEN
        MvcResult result = mockMvc.perform(get(uri)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();
        String actualResult  = result.getResponse().getContentAsString();

        // THEN
        assertThat(actualResult).isEqualTo(expectedResult);
    }

    @Test
    void testCreateProjectReturnExpectedResult() throws Exception {
        // GIVEN
        String uri = "/api/v1/project";
        String content = "{\"name\": \"Project 1\"}";

        // Create a new Project
        KanbanCard kanbanCard1 = new KanbanCard("Card 1", "");
        kanbanCard1.setId(1L);

        KanbanColumn column1 = new KanbanColumn("To Do");
        column1.setId(1L);
        column1.addCard(kanbanCard1);

        KanbanColumn column2 = new KanbanColumn("In Progress");
        column2.setId(2L);

        KanbanColumn column3 = new KanbanColumn("Done");
        column3.setId(3L);

        KanbanBoard board = new KanbanBoard();
        board.setId(1L);
        board.addColumn(column1);
        board.addColumn(column2);
        board.addColumn(column3);

        Project project = new Project("Project 1");
        project.setId(1L);
        project.setBoard(board);

        String expectedResult = new ObjectMapper().writeValueAsString(project);

        // WHEN
        MvcResult result = mockMvc.perform(post(uri)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn();
        String actualResult  = result.getResponse().getContentAsString();

        // THEN
        assertThat(actualResult).isEqualTo(expectedResult);
    }

}