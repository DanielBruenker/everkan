package com.example.everkan.project;

import com.example.everkan.appuser.AppUserRepository;
import com.example.everkan.appuser.AppUserService;
import com.example.everkan.database.entities.AppUser;
import com.example.everkan.database.entities.Project;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final AppUserRepository appUserRepository;

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
