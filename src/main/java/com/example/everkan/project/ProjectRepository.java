package com.example.everkan.project;

import com.example.everkan.database.entities.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    @Query("SELECT project FROM Project project WHERE project.user.id = ?1")
    List<Project> findProjectsByUserId(Long userID);
}
