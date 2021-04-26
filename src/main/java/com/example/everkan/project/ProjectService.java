package com.example.everkan.project;

import com.example.everkan.database.entities.Project;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project createProject(ProjectRequest request) {
        Project project = new Project(request.getName());
        return projectRepository.save(project);
    }

}
