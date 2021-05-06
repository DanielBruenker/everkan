package com.example.everkan.project;

import com.example.everkan.appuser.AppUserRepository;
import com.example.everkan.database.entities.AppUser;
import com.example.everkan.database.entities.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final AppUserRepository appUserRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository, AppUserRepository appUserRepository) {
        this.projectRepository = projectRepository;
        this.appUserRepository = appUserRepository;
    }

    public List<Project> getProjectsByUserId(Long userID) {
        return projectRepository.findProjectsByUserId(userID)
                .orElseThrow(() -> new IllegalStateException("No project found!"));
    }

    public Project createProject(Long userID, ProjectRequest request) {
        AppUser user = appUserRepository.findById(userID)
                .orElseThrow(() -> new IllegalStateException("User not found!"));
        Project project = new Project(request.getName());
        project.setUser(user);
        return projectRepository.save(project);
    }

}
