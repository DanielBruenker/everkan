package com.example.everkan.project;

import com.example.everkan.database.entities.Project;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/user/{userID}")
@AllArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping("projects")
    public List<Project> getProjectsByUserId(@PathVariable Long userID) {
        return projectService.getProjectsByUserId(userID);
    }


    @PostMapping("project")
    public Project createProject(
            @PathVariable Long userID,
            @RequestBody ProjectRequest request
    ) {
        return projectService.createProject(userID, request);
    }

}
