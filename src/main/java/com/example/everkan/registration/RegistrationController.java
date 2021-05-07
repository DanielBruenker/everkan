package com.example.everkan.registration;

import com.example.everkan.registration.token.exception.ConfirmationTokenExpiredException;
import com.example.everkan.registration.token.exception.ConfirmationTokenNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "api/v1/registration")
public class RegistrationController {

    private final RegistrationService registrationService;

    @Autowired
    public RegistrationController(RegistrationService registrationService) {
        this.registrationService = registrationService;
    }

    @PostMapping()
    public String register(@RequestBody RegistrationRequest request) {
        return registrationService.register(request);
    }

    @GetMapping(path = "confirm")
    public String confirm(@RequestParam("token") String token) {
        boolean isConfirmed = false;
        try {
            isConfirmed = registrationService.confirm(token);
        } catch (ConfirmationTokenNotFoundException | ConfirmationTokenExpiredException e) {
            return e.getMessage();
        }
        return (isConfirmed) ? "confirmed" : "Not confirmed!";
    }

}
