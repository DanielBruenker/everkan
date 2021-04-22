package com.example.everkan.registration.token;

import com.example.everkan.database.entities.ConfirmationToken;
import com.example.everkan.registration.token.exception.ConfirmationTokenNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;

    public void saveConfirmationToken(ConfirmationToken token) {
        confirmationTokenRepository.save(token);
    }

    public Optional<ConfirmationToken> getConfirmationToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }

    public void setConfirmedAt(String token, LocalDateTime confirmedAt) {
        ConfirmationToken confirmationToken = getConfirmationToken(token).orElseThrow(() ->
                new ConfirmationTokenNotFoundException(token));
        confirmationToken.setConfirmedAt(confirmedAt);
        confirmationTokenRepository.save(confirmationToken);
    }

}
