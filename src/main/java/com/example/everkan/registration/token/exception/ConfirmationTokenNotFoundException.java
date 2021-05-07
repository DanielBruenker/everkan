package com.example.everkan.registration.token.exception;

public class ConfirmationTokenNotFoundException extends RuntimeException {

    public static final String MESSAGE = "The token %s not found";
    public final String token;

    public ConfirmationTokenNotFoundException(String token) {
        super(String.format(MESSAGE, token));
        this.token = token;
    }

}
