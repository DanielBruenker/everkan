package com.example.everkan.project;

import com.example.everkan.database.entities.Project;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping(path = "api/v1/project")
@AllArgsConstructor
public class ProjectController {

    private final ProjectService projectService;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @PostMapping
    public Project postProject(@RequestBody ProjectRequest request) {
        return projectService.createProject(request);
    }

}
