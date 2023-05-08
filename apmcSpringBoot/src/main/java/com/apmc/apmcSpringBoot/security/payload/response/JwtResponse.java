package com.apmc.apmcSpringBoot.security.payload.response;

import java.util.List;

public class JwtResponse {
    private String token;

    private String type = "Bearer";
    private Long id;
    private String username;

    private List<String> roles;

    private boolean userDetailsExist;

    public JwtResponse(String token, Long id, String username, List<String> roles, boolean userDetailsExist) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.roles = roles;
        this.userDetailsExist = userDetailsExist;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public boolean isUserDetailsExist() {
        return userDetailsExist;
    }

    public void setUserDetailsExist(boolean userDetailsExist) {
        this.userDetailsExist = userDetailsExist;
    }
}
