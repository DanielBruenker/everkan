package com.example.everkan.project;

import com.example.everkan.appuser.AppUserRepository;
import com.example.everkan.database.entities.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.Arrays;
import java.util.List;


import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private AppUserRepository appUserRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Test
    @WithMockUser("username")
    void testGetAllProjectsReturnsExpectedResult() throws Exception {
        // GIVEN
        AppUser user = new AppUser();
        List<Project> projects = Arrays.asList(
                new Project("Project 1"),
                new Project("Project 2"),
                new Project("Project 3")
        );
        projects.forEach(user::addProject);
        appUserRepository.save(user);
        String uri = "/api/v1/user/" + user.getId() + "/projects";
        String expectedResult = "[{\"id\":1,\"name\":\"Project 1\",\"board\":{\"id\":1,\"" +
                "columns\":[{\"id\":1,\"title\":\"To Do\",\"index\":0,\"cards\":[{\"id\":1," +
                "\"title\":\"Card 1\",\"description\":\"\",\"noteLink\":\"\",\"index\":0," +
                "\"columnId\":1}]},{\"id\":2,\"title\":\"In Progress\",\"index\":1,\"cards\"" +
                ":[]},{\"id\":3,\"title\":\"Done\",\"index\":2,\"cards\":[]}]}},{\"id\":2,\"name\":\"" +
                "Project 2\",\"board\":{\"id\":2,\"columns\":[{\"id\":4,\"title\":\"To Do\",\"index\"" +
                ":0,\"cards\":[{\"id\":2,\"title\":\"Card 1\",\"description\":\"\",\"noteLink\":\"\"," +
                "\"index\":0,\"columnId\":4}]},{\"id\":5,\"title\":\"In Progress\",\"index\":1,\"cards\"" +
                ":[]},{\"id\":6,\"title\":\"Done\",\"index\":2,\"cards\":[]}]}},{\"id\":3,\"name\":\"Project 3" +
                "\",\"board\":{\"id\":3,\"columns\":[{\"id\":7,\"title\":\"To Do\",\"index\":0,\"cards\":[{\"id\"" +
                ":3,\"title\":\"Card 1\",\"description\":\"\",\"noteLink\":\"\",\"index\":0,\"columnId\":7}]}," +
                "{\"id\":8,\"title\":\"In Progress\",\"index\":1,\"cards\":[]},{\"id\":9,\"title\":\"Done\"," +
                "\"index\":2,\"cards\":[]}]}}]";

        // WHEN
        MvcResult result = mockMvc.perform(get(uri)
                .accept(MediaType.APPLICATION_JSON))
                .andReturn();
        String actualResult = result.getResponse().getContentAsString();

        // THEN
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualResult).isEqualTo(expectedResult);
    }

    @Test
    @WithMockUser("username")
    void testCreateProjectReturnExpectedResult() throws Exception {
        // GIVEN
        AppUser user = new AppUser();
        appUserRepository.save(user);

        String uri = "/api/v1/user/" + user.getId() + "/project";

        String content = "{\"name\": \"Project 1\"}";

        String expectedResult = "{\"id\":1,\"name\":\"Project 1\",\"board\":" +
                "{\"id\":1,\"columns\":[{\"id\":1,\"title\":\"To Do\",\"index\":0," +
                "\"cards\":[{\"id\":1,\"title\":\"Card 1\",\"description\":\"\"," +
                "\"noteLink\":\"\",\"index\":0,\"columnId\":null}]},{\"id\":2,\"title\":" +
                "\"In Progress\",\"index\":1,\"cards\":[]},{\"id\":3,\"title\":\"Done\"," +
                "\"index\":2,\"cards\":[]}]}}";

        // WHEN
        MvcResult result = mockMvc.perform(post(uri)
                .contentType(MediaType.APPLICATION_JSON)
                .content(content)
                .accept(MediaType.APPLICATION_JSON))
                .andReturn();
        String actualResult = result.getResponse().getContentAsString();
        List<Project> projects = projectRepository.findProjectsByUserId(user.getId());

        // THEN
        // Check response
        assertThat(result.getResponse().getStatus()).isEqualTo(HttpStatus.OK.value());
        assertThat(actualResult).isEqualTo(expectedResult);

        // Check is project created in database
        assertThat(projects.size()).isEqualTo(1);
    }

}