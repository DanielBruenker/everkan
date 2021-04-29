package com.example.everkan.security.jwt;

public class JwtSecurityConstants {
    public static final String SECRET = "SecretKeyToGenJWTs";
    public static final long EXPIRATION_TIME = 86_400_000;
    public static final String TOKEN_PREFIX = "Bearer";
    public static final String HEADER_STRING = "Authorization";
    public static final String SIGN_IN_URL = "/api/v1/auth/signin";
    public static final String SIGN_UP_URL = "/api/v1/signup";
}
