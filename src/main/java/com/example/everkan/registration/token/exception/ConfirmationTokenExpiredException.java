package com.example.everkan.registration.token.exception;

import java.time.LocalDateTime;

public class ConfirmationTokenExpiredException extends RuntimeException {

    public static final String MESSAGE = "Token is expired on %s!";
    public final LocalDateTime expiredAt;
    public final String token;


    public ConfirmationTokenExpiredException(LocalDateTime expiredAt, String token) {
        super(String.format(MESSAGE, expiredAt));
        this.expiredAt = expiredAt;
        this.token = token;

    }


}
