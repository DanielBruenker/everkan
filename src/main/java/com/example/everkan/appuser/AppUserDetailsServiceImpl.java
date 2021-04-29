package com.example.everkan.appuser;

import com.example.everkan.database.entities.AppUser;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
public class AppUserDetailsServiceImpl implements UserDetailsService {

    private final AppUserRepository appUserRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("User not found with username " + email));
        return AppUser.build(appUser);
    }
}
