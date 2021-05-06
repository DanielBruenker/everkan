package com.example.everkan;

import com.example.everkan.appuser.AppUserRepository;
import com.example.everkan.database.entities.AppUser;
import com.example.everkan.database.entities.AppUserRole;
import com.example.everkan.database.entities.Project;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Profile("!test")
public class DatabaseLoader implements CommandLineRunner {

    private final AppUserRepository appUserRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public DatabaseLoader(AppUserRepository appUserRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.appUserRepository = appUserRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public void run(String... strings) throws Exception {
        AppUser appUser = new AppUser(
                "Max",
                "Mustermann",
                "Max.Mustermann@gmail.com",
                bCryptPasswordEncoder.encode("password"),
                AppUserRole.USER,
                false,
                true
        );
        Project project = new Project("Project 1");
        appUser.addProject(project);
        appUserRepository.save(appUser);
    }
}