package com.apmc.apmcSpringBoot.security.jwt;

import com.apmc.apmcSpringBoot.security.config.MyUserDetails;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtils {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

//    @Value("${app.jwtSecret}")
    private String jwtSecret="secretKeyssssssssssssssssssssssssssssssssfdfffffffffffdfdfdfdfdfbnnnnnnnnnnnnnnnnnnnmbhjjjjjjjjjjjjjhhhhhhhhhhhhhhhhhgfgjhghgjgjggjgjgjhgytfytjyfkfj";

//    @Value("${app.jwtExpirationMs}")
    private int jwtExpirationMs=123455;

    public String generateJwtToken(Authentication authentication) {

        MyUserDetails userPrincipal = (MyUserDetails) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            return true;
        } catch (Exception e){
            logger.error("error is "+e.getMessage());
        }

        return false;
    }
}
