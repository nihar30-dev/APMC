package com.apmc.apmcSpringBoot.security.config;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;
import java.util.Collections;

public class GoogleAuthentication {
    HttpTransport transport = new NetHttpTransport();
    JsonFactory jsonFactory = new JacksonFactory();


    GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, jsonFactory)
            .setIssuers(Arrays.asList("https://accounts.google.com", "accounts.google.com"))
            .setAudience(Collections.singletonList("238985952076-ip1l9j07bci4474ajuklhed9nvp3rskc.apps.googleusercontent.com"))
            .build();



    public String isVerified(String idTokenString) throws GeneralSecurityException, IOException {
        GoogleIdToken idToken = verifier.verify(idTokenString);
               if (idToken != null) {
        Payload payload = idToken.getPayload();


        // Use or store profile information

                    return payload.getEmail();

    } else {
        return "error";
    }

    }



}
