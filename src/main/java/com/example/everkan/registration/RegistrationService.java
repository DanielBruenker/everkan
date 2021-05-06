package com.example.everkan.registration;

import com.example.everkan.appuser.AppUserService;
import com.example.everkan.database.entities.AppUser;
import com.example.everkan.database.entities.AppUserRole;
import com.example.everkan.database.entities.ConfirmationToken;
import com.example.everkan.email.EmailSender;
import com.example.everkan.registration.token.ConfirmationTokenService;
import com.example.everkan.registration.token.exception.ConfirmationTokenExpiredException;
import com.example.everkan.registration.token.exception.ConfirmationTokenNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
public class RegistrationService {

    private final AppUserService appUserService;
    private final EmailValidator emailValidator;
    private final EmailSender emailSender;
    private final ConfirmationTokenService confirmationTokenService;

    @Autowired
    public RegistrationService(AppUserService appUserService,
                               EmailValidator emailValidator,
                               EmailSender emailSender,
                               ConfirmationTokenService confirmationTokenService) {
        this.appUserService = appUserService;
        this.emailValidator = emailValidator;
        this.emailSender = emailSender;
        this.confirmationTokenService = confirmationTokenService;
    }

    public String register(RegistrationRequest request) {
        boolean isValidEmail = emailValidator.test(request.getEmail());
        if (!isValidEmail) {
            throw new IllegalStateException("email not valid");
        }
        String token = appUserService.signUpUser(new AppUser(
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                request.getPassword(),
                AppUserRole.USER
        ));
        String link = "http://localhost:8080/api/v1/registration/confirm?token=" + token;
        emailSender.send(
                request.getEmail(),
                buildEmail(request.getFirstName(), link));
        return token;
    }

    /***
     * Confirm registration by token
     * @param token registration token
     * @return true if the registration confirmed, else false
     */
    @Transactional
    public Boolean confirm(String token) throws ConfirmationTokenNotFoundException,
            ConfirmationTokenExpiredException {
        ConfirmationToken confirmationToken = confirmationTokenService
                .getConfirmationToken(token)
                .orElseThrow(() -> new ConfirmationTokenNotFoundException(token));
        if (confirmationToken.isConfirmed()) {
            return true;
        }
        LocalDateTime expiredAt = confirmationToken.getExpiresAt();
        if (expiredAt.isBefore(LocalDateTime.now())) {
            throw new ConfirmationTokenExpiredException(expiredAt, token);
        }
        confirmationTokenService.setConfirmedAt(token, LocalDateTime.now());
        appUserService.enableAppUser(confirmationToken.getAppUser().getEmail());
        return true;
    }

    private String buildEmail(String name, String link) {
        return "<div>" +
                "<p>Hi " + name + ",</p><p> Thank you for registering. " +
                "Please click on the below link to activate your account: " +
                "</p><blockquote><p> <a href=\"" + link + "\">Activate Now</a> </p></blockquote>\n " +
                "Link will expire in 15 minutes. <p>See you soon</p>" +
                "</div>";
    }

}
