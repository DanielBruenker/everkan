package com.example.everkan.security.jwt;

import com.example.everkan.database.entities.AppUser;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    public String generateJwtToken(Authentication authentication) {

        AppUser userPrinzipal = (AppUser) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userPrinzipal.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + JwtSecurityConstants.EXPIRATION_TIME.toMillis()))
                .signWith(SignatureAlgorithm.HS512, JwtSecurityConstants.SECRET)
                .compact();

    }

    public String getUserEmailFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(JwtSecurityConstants.SECRET).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(JwtSecurityConstants.SECRET).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        } catch (Exception e) {
            logger.error(e.getMessage());
        }

        return false;
    }

}
