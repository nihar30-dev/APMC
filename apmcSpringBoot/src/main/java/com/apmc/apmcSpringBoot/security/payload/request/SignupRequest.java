package com.apmc.apmcSpringBoot.security.payload.request;


import java.util.Set;

public class SignupRequest {

//  @Size(min = 3, max = 20)
  private String username;

  private Set<String> role;

//  @NotBlank
//  @Size(min = 6, max = 40)
  private String password;



  private String contact;

  public SignupRequest(String username, String password, String contact) {
    this.username = username;
    this.password = password;
    this.contact = contact;
  }


  public SignupRequest(String username,String password, String contact, Set<String> role) {
    this.username = username;
    this.role = role;
    this.password = password;
    this.contact = contact;
  }

  public SignupRequest() {
  }


  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }



  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<String> getRole() {
    return this.role;
  }

  public void setRole(Set<String> role) {
    this.role = role;
  }

  public String getContact() {
    return contact;
  }

  public void setContact(String contact) {
    this.contact = contact;
  }
}
